import { useEffect, useState } from "react";

import { fetchCurrentChannelInfo } from "../utils/twitchApi";

import useTwitchAuth from "./useTwitchAuth";

export default () => {
  const auth = useTwitchAuth();
  const [channelName, setChannelName] = useState<string>();

  useEffect(() => {
    if (!auth) return;

    fetchCurrentChannelInfo(auth)
      .then((newChannelInfo) => {
        if (typeof newChannelInfo?.broadcaster_name === "string") {
          setChannelName(newChannelInfo.broadcaster_name);
        }
      })
      .catch((e) => {
        console.error("Failed to fetch channel info", e);
        return undefined;
      });
  }, [auth]);

  return channelName;
};
