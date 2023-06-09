import { useCallback, useEffect, useMemo, useState } from "react";
import tmi, { ChatUserstate } from "tmi.js";

import { ambassadors, AmbassadorKey } from "./ambassadors";
import { typeSafeObjectEntries } from "./helpers";
import { fetchCurrentChannelInfo, useTwitchAuth } from "./twitch-api";

const testChannelNames =
  process.env.REACT_APP_TEST_CHANNEL_NAMES?.split(",") ?? [];
const defaultChannelNames =
  process.env.REACT_APP_DEFAULT_CHANNEL_NAMES?.split(",") ?? [];

export const normalizeAmbassadorName = (
  name: string,
  stripDiacritic = false
): string => {
  const first = name.split(" ")[0].toLowerCase();
  return stripDiacritic
    ? first.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    : first;
};

/**
 * @description Creates a map of ambassador names to their keys, for chat commands.
 *
 * Some ambassadors have names with diacritics in them (Ex: Jalapeño), so this function
 * also maps normalized names to their original names. (Ex: jalapeno -> jalapeño)
 */
const getAmbassadorCommandsMap = (): Map<string, AmbassadorKey> => {
  const commandMap = new Map<string, AmbassadorKey>();
  typeSafeObjectEntries(ambassadors).forEach(([key, ambassador]) => {
    // Always add the original name to the map
    const normalizedWithDiacritics = normalizeAmbassadorName(ambassador.name);
    commandMap.set(normalizedWithDiacritics, key);

    // If the ambassador has a diacritic in their name, add the normalized name to the map
    const normalizedWithoutDiacritics = normalizeAmbassadorName(
      ambassador.name,
      true
    );
    if (normalizedWithDiacritics !== normalizedWithoutDiacritics)
      commandMap.set(normalizedWithoutDiacritics, key);
  });
  return commandMap;
};

const useChannelNames = () => {
  const auth = useTwitchAuth();
  const [channelNames, setChannelNames] = useState<string[]>([
    ...testChannelNames,
    ...defaultChannelNames,
  ]);

  useEffect(() => {
    if (!auth) return;

    fetchCurrentChannelInfo(auth)
      .then((newChannelInfo) => {
        if (newChannelInfo) {
          // NOTE: We could use the channel info here to e.g. parse the title and
          //      highlight the ambassadors for the current scene
          setChannelNames([
            ...testChannelNames,
            newChannelInfo.broadcaster_name,
          ]);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch channel info", e);
        return undefined;
      });
  }, [auth]);

  return channelNames;
};

export default function useChatCommand(callback: (command: string) => void) {
  const channelNames = useChannelNames();
  const commandsMap = useMemo(() => {
    const commands = getAmbassadorCommandsMap() as Map<string, string>;
    commands.set("welcome", "welcome");
    return commands;
  }, []);

  const messageHandler = useCallback(
    (channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
      // Ignore if user is not a moderator or broadcaster or test user
      if (
        !tags.mod &&
        !tags.badges?.broadcaster &&
        tags.username !== process.env.REACT_APP_CHAT_COMMANDS_PRIVILEGED_USER
      )
        return;
      // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
      if (self || !msg.trim().startsWith("!")) return;

      const commandName = msg.trim().toLowerCase().slice(1);
      const command = commandsMap.get(commandName);
      console.log(
        `*Twitch extension received command: ${commandName}*`,
        command
      );
      if (command) callback(command);
    },
    [commandsMap, callback]
  );

  const connectedHandler = useCallback(() => {
    console.log("*Twitch extension is connected to chat*");
  }, []);

  useEffect(() => {
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: channelNames.map((name) => `#${name}`),
    });
    client.on("message", messageHandler);
    client.on("connected", connectedHandler);
    client.connect();

    return () => {
      client.disconnect();
    };
  }, [channelNames, connectedHandler, messageHandler]);
}
