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

export { isAmbassadorKey, getAmbassadorImages, getIUCNStatus, type Ambassadors, type AmbassadorKey, type Ambassador };
