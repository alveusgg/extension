import { useState, useCallback, Fragment, useMemo, useEffect } from "react";

import AmbassadorCard from "../../../components/AmbassadorCard";
import AmbassadorButton from "../../../components/AmbassadorButton";

import {
  useAmbassadors,
  useAmbassadorsRefresh,
} from "../../../hooks/useAmbassadors";

import useChatCommand from "../../../hooks/useChatCommand";
import { typeSafeObjectEntries } from "../../../utils/helpers";

import Overlay from "./Overlay";

export default function Ambassadors() {
  const rawAmbassadors = useAmbassadors();
  const refresh = useAmbassadorsRefresh();
  const ambassadors = useMemo(
    () => typeSafeObjectEntries(rawAmbassadors ?? {}),
    [rawAmbassadors],
  );

  // Allow chat commands to select an ambassador, as well as the user
  const [ambassadorCard, setAmbassadorCard] = useState<string>();
  useChatCommand(
    useCallback(
      (command: string) => {
        if (command == "refresh") {
          setTimeout(
            () => {
              refresh?.();
            },
            Math.floor(Math.random() * 120 * 1000),
          );
        } else if (Object.keys(rawAmbassadors ?? {}).includes(command))
          setAmbassadorCard(command);
      },
      [rawAmbassadors],
    ),
  );

  // Unselect ambassador card if ambassador is no longer available after refresh
  useEffect(() => {
    if (ambassadorCard && rawAmbassadors && !rawAmbassadors?.[ambassadorCard]) {
      setAmbassadorCard(undefined);
    }
  }, [rawAmbassadors]);

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
