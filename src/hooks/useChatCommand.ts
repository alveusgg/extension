import { useCallback, useEffect, useMemo } from "react";
import tmi, { type ChatUserstate } from "tmi.js";

import { typeSafeObjectEntries } from "../utils/helpers";

import { refreshAmbassadors, useAmbassadors } from "./useAmbassadors";

import useChannel from "./useChannel";

const parseCsvEnv = (env: string | undefined): string[] =>
  env?.split(",").map((str) => str.toLowerCase()) ?? [];

const testChannelNames = parseCsvEnv(process.env.REACT_APP_TEST_CHANNEL_NAMES);
const defaultChannelNames = parseCsvEnv(
  process.env.REACT_APP_DEFAULT_CHANNEL_NAMES,
);
const extraChannelNames = parseCsvEnv(
  process.env.REACT_APP_EXTRA_CHANNEL_NAMES,
);
const privilegedUsers = parseCsvEnv(
  process.env.REACT_APP_CHAT_COMMANDS_PRIVILEGED_USERS,
);

export default function useChatCommand(callback: (command: string) => void) {
  const channel = useChannel();
  const channelNames = useMemo(
    () =>
      Array.from(
        new Set(
          [
            // Always connect to any test channels, for development.
            ...testChannelNames,
            // If we know what channel we're in, connect to it.
            // Otherwise, connect to the default channels.
            ...(channel ? [channel] : defaultChannelNames),
            // If we're not in a default channel, connect to the extra channels.
            // Extra channels are used for mod control during collaborations,
            //  so we don't need to connect to them if we're in a default channel.
            ...(channel && !defaultChannelNames.includes(channel)
              ? extraChannelNames
              : []),
          ].map((name) => name.toLowerCase()),
        ),
      ),
    [channel],
  );

  const ambassadors = useAmbassadors();
  const refresh = refreshAmbassadors();
  if (!refresh) {
    throw new Error("Error with refresh context type");
  }
  const commandsMap = useMemo(() => {
    const commands = new Map<string, string>();
    if (ambassadors) {
      typeSafeObjectEntries(ambassadors).forEach(([key, ambassador]) => {
        ambassador.commands.forEach((command) => {
          commands.set(command.toLowerCase(), key);
        });
      });
    }
    commands.set("welcome", "welcome");
    commands.set("refresh", "refresh");
    return commands;
  }, [ambassadors]);

  const messageHandler = useCallback(
    (
      id: number,
      channel: string,
      tags: ChatUserstate,
      msg: string,
      self: boolean,
    ) => {
      // Ignore if user is not a moderator or broadcaster or test user
      if (
        !tags.mod &&
        !tags.badges?.broadcaster &&
        !privilegedUsers.includes(tags.username?.toLowerCase() ?? "")
      )
        return;
      // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
      if (self || !msg.trim().startsWith("!")) return;

      const commandName = msg.trim().toLowerCase().slice(1);
      const command = commandsMap.get(commandName);
      if (!command) {
        throw new Error("Command mapping has an error");
      }
      console.log(
        `*Twitch extension received command: ${commandName} (${command})*`,
        id,
      );
      if (
        command == "refresh" &&
        privilegedUsers.includes(tags.username?.toLowerCase() ?? "")
      ) {
        setTimeout(
          () => {
            refresh();
          },
          Math.floor(Math.random() * 120 * 1000),
        );
      } else {
        callback(command);
      }
    },
    [commandsMap, callback, refresh],
  );

  useEffect(() => {
    const id = Date.now();
    console.log("*Twitch extension is connecting to chat*", id);

    // Create the client
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: channelNames.map((name) => `#${name}`),
    });

    // Handle incoming messages
    client.on("message", (...args) => messageHandler(id, ...args));

    // Handle race condition where we connect after being unmounted
    let closing = false;
    client.on("connected", () => {
      // If we connected after being unmounted, disconnect (again)
      if (closing) {
        client
          .disconnect()
          .then(() =>
            console.log(
              "*Twitch extension disconnected from chat (after connecting)*",
              id,
            ),
          );
        return;
      }

      console.log(
        `*Twitch extension is connected to chat: ${channelNames.join(", ")}*`,
        id,
      );
    });

    // Connect to chat
    client.connect();

    // Disconnect from chat when unmounting
    return () => {
      closing = true;
      client
        .disconnect()
        .then(() =>
          console.log("*Twitch extension disconnected from chat*", id),
        );
    };
  }, [channelNames, messageHandler]);
}
