import {
  ContextType,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

import allAmbassadors, {
  ambassadorSchema,
} from "@alveusgg/data/src/ambassadors/core";
import { isActiveAmbassadorEntry } from "@alveusgg/data/src/ambassadors/filters";
import { getClassification } from "@alveusgg/data/src/ambassadors/classification";
import {
  getAmbassadorImages,
  ambassadorImageSchema,
} from "@alveusgg/data/src/ambassadors/images";
import { getIUCNStatus } from "@alveusgg/data/src/iucn";

import {
  typeSafeObjectEntries,
  typeSafeObjectFromEntries,
} from "../utils/helpers";

import winstonImage from "../assets/winston.png";

// These schema should match the type exposed by the API
const apiAmbassadorSchema = ambassadorSchema.extend({
  image: ambassadorImageSchema,
  iucn: ambassadorSchema.shape.iucn.extend({
    title: z.string(),
  }),
  class: z.object({
    name: ambassadorSchema.shape.class,
    title: z.string(),
  }),
});

const apiSchema = z.object({
  ambassadors: z.record(apiAmbassadorSchema),
});

type Ambassador = z.infer<typeof apiAmbassadorSchema>;

const websiteUrl = process.env.REACT_APP_WEBSITE_URL?.replace(/\/+$/, "");
if (!websiteUrl)
  throw new Error("REACT_APP_WEBSITE_URL environment variable is not set");

const fetchAmbassadors = async (): Promise<Record<string, Ambassador>> => {
  const response = await fetch(`${websiteUrl}/api/stream/ambassadors`);
  if (!response.ok)
    throw new Error(
      `Failed to fetch ambassadors: ${response.status} ${response.statusText} ${await response.text()}`,
    );

  const data = await response.json();
  return apiSchema.parse(data).ambassadors;
};

const fallbackAmbassadors: Record<string, Ambassador> =
  typeSafeObjectFromEntries(
    typeSafeObjectEntries(allAmbassadors)
      .filter(isActiveAmbassadorEntry)
      .map<[string, Ambassador]>(([key, val]) => {
        const image = getAmbassadorImages(key)[0];

        return [
          key,
          {
            ...val,
            image,
            iucn: {
              ...val.iucn,
              title: getIUCNStatus(val.iucn.status),
            },
            class: {
              name: val.class,
              title: getClassification(val.class),
            },
          },
        ];
      }),
  );

// Use a context to fetch the ambassadors from the API
const Context = createContext<Record<string, Ambassador> | null>(null);
export const AmbassadorsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ambassadors, setAmbassadors] =
    useState<ContextType<typeof Context>>(null);

  // On mount, attempt to fetch the ambassadors from the API
  // If we can't fetch the ambassadors, use the data from the data package
  useEffect(() => {
    fetchAmbassadors()
      .catch((err) => {
        console.error(err);
        return fallbackAmbassadors;
      })
      .then(setAmbassadors);
  }, []);

  // Every 2 hours, attempt to fetch the ambassadors from the API
  // If we can't fetch the ambassadors, we'll just use the existing data
  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchAmbassadors()
          .then(setAmbassadors)
          .catch((err) => console.error(err));
      },
      2 * 60 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return <Context value={ambassadors}>{children}</Context>;
};

const dateKey = () => {
  const date = new Date();
  return `${(date.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
};

const winston = {
  name: "Winston",
  alternate: [],
  commands: ["winston"],
  class: {
    name: "mammalia",
    title: getClassification("mammalia"),
  },
  species: "Polar Bear",
  scientific: "Twitchus memeticus",
  sex: "Male",
  birth: "2020-04-01",
  arrival: "2022-12-01",
  retired: null,
  iucn: {
    id: null,
    status: "NE",
    title: getIUCNStatus("NE"),
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
  lifespan: {
    source: "",
  },
  clips: [],
  homepage: null,
  plush: null,
  image: {
    src: winstonImage,
    alt: "Winston the polar bear",
    position: "50% 25%",
  },
} as const satisfies Ambassador;

const isWinstonDate = (date: string) => date === "04-01";

export const useAmbassadors = (): Record<string, Ambassador> | null => {
  const ambassadors = useContext(Context);

  // Setup a timer to store the current month and day
  const [date, setDate] = useState<string>(() => dateKey());
  useEffect(() => {
    const interval = setInterval(() => setDate(dateKey()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Return the ambassadors, with Winston added to the start if it's April 1st
  return useMemo(
    () =>
      ambassadors
        ? {
            ...ambassadors,
            ...(isWinstonDate(date) ? { winston } : {}),
          }
        : null,
    [ambassadors, date],
  );
};

export const useAmbassador = (key: string) => {
  const ambassadors = useAmbassadors();
  return ambassadors?.[key];
};
