import { useEffect, useMemo, useState } from "react";

import allAmbassadors, {
  type Ambassador,
} from "@alveusgg/data/src/ambassadors/core";
import {
  isActiveAmbassadorKey,
  isActiveAmbassadorEntry,
  type ActiveAmbassadors,
  type ActiveAmbassadorKey,
} from "@alveusgg/data/src/ambassadors/filters";
import {
  Class,
  getClassification,
} from "@alveusgg/data/src/ambassadors/classification";
import {
  getAmbassadorImages as getAmbassadorImagesSrc,
  type AmbassadorImage,
  type AmbassadorImages,
} from "@alveusgg/data/src/ambassadors/images";
import { getIUCNStatus } from "@alveusgg/data/src/iucn";

import { typeSafeObjectEntries, type ObjectEntries } from "./helpers";
import { sortDate } from "./dateManager";

const dateKey = () => {
  const date = new Date();
  return `${(date.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
};

const winston = {
  name: "Winston",
  alternate: [],
  commands: ["winston"],
  class: Class.Mammalia,
  species: "Polar Bear",
  scientific: "Twitchus memeticus",
  sex: "Male",
  birth: "2020-04-01",
  arrival: "2022-12-01",
  retired: null,
  iucn: {
    id: null,
    status: "NE",
  },
  enclosure: "wolves",
  story:
    "Winston was rescued by the Ontario Zoo in Canada after it was noticed that he was watching streams too often and not touching grass. Originally on loan to Alveus for two years, he is now a permanent resident of Texas.",
  mission:
    "He is an ambassador for stream-life balance and encouraging all chatters to step away from their devices more often.",
  native: {
    text: "Twitch chat (including the Animals, Aquariums, & Zoos category), miscellaneous emote services",
    source:
      "https://clips.twitch.tv/TangibleFurryTortoiseBCWarrior-izyQ3nOgq1pYe1rc", // https://clips.twitch.tv/CleverSecretiveAntChocolateRain--zjm5eRw6zxG75Up
  },
  clips: [],
  homepage: null,
  plush: null,
} as const satisfies Ambassador;

const winstonImages: AmbassadorImages = [
  {
    src: "https://alveus.gg/images/ambassadors/winston.png",
    alt: "Winston the polar bear",
  },
];

const isWinstonDate = (date: string) => date === "04-01";

// While Winston is always in the types, the runtime check should only expose him on April 1st
type Ambassadors = ActiveAmbassadors & { winston: typeof winston };
export type AmbassadorKey = ActiveAmbassadorKey | "winston";
export const isAmbassadorKey = (key: string): key is AmbassadorKey =>
  isActiveAmbassadorKey(key) || (key === "winston" && isWinstonDate(dateKey()));

const sortedAmbassadors = typeSafeObjectEntries(allAmbassadors)
  .filter(isActiveAmbassadorEntry)
  .sort(([, a], [, b]) => sortDate(a.arrival, b.arrival));
export const useAmbassadors = () => {
  // Setup a timer to store the current month and day
  const [date, setDate] = useState<string>(() => dateKey());
  useEffect(() => {
    const interval = setInterval(() => setDate(dateKey()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Return the ambassadors, with Winston added to the start if it's April 1st
  return useMemo(() => {
    const ambassadors: ObjectEntries<Ambassadors> = sortedAmbassadors.slice();
    if (isWinstonDate(date)) ambassadors.unshift(["winston", winston]);
    return ambassadors;
  }, [date]);
};

// We can always expose Winston here as the key will only be present in runtime logic on April 1st
export const useAmbassador = (key: AmbassadorKey): Ambassadors[typeof key] =>
  useMemo(
    () =>
      key === "winston"
        ? winston
        : sortedAmbassadors.find(([k]) => k === key)![1],
    [key],
  );
export const getAmbassadorImages = (key: AmbassadorKey): AmbassadorImages =>
  key === "winston" ? winstonImages : getAmbassadorImagesSrc(key);

export {
  getClassification,
  getIUCNStatus,
  type Ambassador,
  type AmbassadorImage,
};
