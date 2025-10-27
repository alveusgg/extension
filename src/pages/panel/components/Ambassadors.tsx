import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import AmbassadorButton from "../../../components/AmbassadorButton";
import AmbassadorCard from "../../../components/AmbassadorCard";

import {
  useAmbassadors,
  useAmbassadorsRefresh,
} from "../../../hooks/useAmbassadors";

import useChatCommand from "../../../hooks/useChatCommand";
import { sortPartialDates } from "../../../utils/dateManager";
import { sortAmbassadors, typeSafeObjectEntries } from "../../../utils/helpers";
import useSettings from "../../overlay/hooks/useSettings";

import Overlay from "./Overlay";

export default function Ambassadors() {
  const settings = useSettings();
  const rawAmbassadors = useAmbassadors();
  const refresh = useAmbassadorsRefresh();
  const ambassadors = useMemo(
    () =>
      sortAmbassadors(
        typeSafeObjectEntries(rawAmbassadors ?? {}),
        settings.ambassadorSort.value,
        sortPartialDates,
      ),
    [rawAmbassadors, settings.ambassadorSort.value],
  );

  // Allow chat commands to select an ambassador, as well as the user
  const [ambassadorCard, setAmbassadorCard] = useState<string>();
  useChatCommand(
    useCallback(
      (command: string) => {
        if (command === "refresh") {
          setTimeout(
            () => {
              refresh?.();
            },
            Math.floor(Math.random() * 120 * 1000),
          );
          return;
        }

        if (Object.keys(rawAmbassadors ?? {}).includes(command))
          setAmbassadorCard(command);
      },
      [refresh, rawAmbassadors],
    ),
  );

  // Unselect ambassador card if ambassador is no longer available after refresh
  useEffect(() => {
    if (ambassadorCard && rawAmbassadors && !rawAmbassadors?.[ambassadorCard]) {
      setAmbassadorCard(undefined);
    }
  }, [ambassadorCard, rawAmbassadors]);

  return (
    <main className="relative scrollbar flex max-h-full flex-wrap justify-center gap-4 overflow-x-hidden overflow-y-auto px-2 pt-16 pb-4 scrollbar-thumb-alveus-green scrollbar-track-alveus-tan md:px-4">
      <div className="absolute inset-x-0 top-0 h-12 w-screen bg-alveus-green" />

      {ambassadors.map(([key]) => (
        <Fragment key={key}>
          <Overlay
            show={ambassadorCard === key}
            onClose={() => setAmbassadorCard(undefined)}
          >
            <AmbassadorCard
              ambassador={key}
              onClose={() => setAmbassadorCard(undefined)}
              disableCardEffects
            />
          </Overlay>

          <AmbassadorButton
            ambassador={key}
            onClick={() => setAmbassadorCard(key)}
            className="w-32 max-w-full md:w-48"
          />
        </Fragment>
      ))}
    </main>
  );
}
