import allAmbassadors, { type Ambassador } from "@alveusgg/data/src/ambassadors/core";
import {
  isActiveAmbassadorKey as isAmbassadorKey,
  isActiveAmbassadorEntry,
  type ActiveAmbassadors as Ambassadors,
  type ActiveAmbassadorKey as AmbassadorKey,
} from "@alveusgg/data/src/ambassadors/filters";
import { getAmbassadorImages } from "@alveusgg/data/src/ambassadors/images";
import { getIUCNStatus } from "@alveusgg/data/src/iucn";

import { typeSafeObjectEntries, typeSafeObjectFromEntries } from "./helpers"
import { sortDate } from "./dateManager";

export const sortedAmbassadors = typeSafeObjectEntries(allAmbassadors)
  .filter(isActiveAmbassadorEntry)
  .sort(([, a], [, b]) => sortDate(a.arrival, b.arrival));

export const ambassadors = typeSafeObjectFromEntries(sortedAmbassadors);

const ambassadorImagePositions: Partial<{
    [key in AmbassadorKey]: string
}> = {
    stompy: "50% 30%",
    tico: "50% 0%",
    miley: "50% 0%",
    mia: "50% 10%",
    coconut: "50% 30%",
    oliver: "50% 0%",
    nugget: "50% 0%",
    henrique: "50% 20%",
    patchy: "50% 100%",
    fenn: "50% 35%",
    marty: "50% 100%",
    momo: "50% 0%",
};

export const getAmbassadorImagePosition = (ambassador: AmbassadorKey): string | undefined => ambassadorImagePositions[ambassador];

export { isAmbassadorKey, getAmbassadorImages, getIUCNStatus, type Ambassadors, type AmbassadorKey, type Ambassador };
