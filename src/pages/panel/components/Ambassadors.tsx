import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import AmbassadorButton from "../../../components/AmbassadorButton";
import AmbassadorCard from "../../../components/AmbassadorCard";

import {
  useAmbassadors,
  useAmbassadorsRefresh,
} from "../../../hooks/useAmbassadors";

import useChatCommand from "../../../hooks/useChatCommand";
import { sortPartialDates } from "../../../utils/dateManager";
import { typeSafeObjectEntries } from "../../../utils/helpers";
import type { SortMethod } from "../../../utils/sorting";
import { sortAmbassadors } from "../../../utils/sorting";

import Overlay from "./Overlay";

export default function Ambassadors() {
  // Panel uses default settings (no SettingsProvider) — default sort method is "default"
  const settingsSort: SortMethod = "default";
  const rawAmbassadors = useAmbassadors();
  const refresh = useAmbassadorsRefresh();
  const ambassadors = useMemo(
    () =>
      sortAmbassadors(
        typeSafeObjectEntries(rawAmbassadors ?? {}),
        settingsSort,
        sortPartialDates,
      ),
    [rawAmbassadors],
  );

  // Allow chat commands to select an ambassador, as well as the user
  const [ambassadorCard, setAmbassadorCard] = useState<string>();
  useChatCommand(
    useCallback(
      (command: string, args: string[]) => {
        if (
          command === "refresh" &&
          args.length === 1 &&
          args[0] === "extension"
        ) {
          setTimeout(
            () => {
              refresh?.();
            },
            Math.floor(Math.random() * 120 * 1000),
          );
          return;
        }

        if (
          Object.keys(rawAmbassadors ?? {}).includes(command) &&
          args.length === 0
        )
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
