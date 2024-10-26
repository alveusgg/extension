import { useState, useCallback, Fragment } from "react";

import AmbassadorCard from "../../../components/AmbassadorCard";
import AmbassadorButton from "../../../components/AmbassadorButton";

import {
  isAmbassadorKey,
  useAmbassadors,
  type AmbassadorKey,
} from "../../../utils/ambassadors";

import useChatCommand from "../../../hooks/useChatCommand";

import Overlay from "./Overlay";

export default function AmbassadorPanel() {
  const ambassadors = useAmbassadors();

  // Allow chat commands to select an ambassador, as well as the user
  const [ambassadorCard, setAmbassadorCard] = useState<AmbassadorKey>();
  useChatCommand(
    useCallback((command: string) => {
      if (isAmbassadorKey(command)) setAmbassadorCard(command);
    }, []),
  );

  return (
    <main className="scrollbar scrollbar-track-alveus-tan scrollbar-thumb-alveus-green relative flex max-h-full flex-wrap justify-center gap-4 overflow-y-auto overflow-x-hidden px-4 pb-4 pt-16">
      <div className="bg-alveus-green absolute inset-x-0 top-0 h-12 w-screen" />

      {ambassadors.map(([key]) => (
        <Fragment key={key}>
          <Overlay
            show={ambassadorCard === key}
            onClose={() => setAmbassadorCard(undefined)}
          >
            <AmbassadorCard
              ambassador={key}
              onClose={() => setAmbassadorCard(undefined)}
            />
          </Overlay>

          <AmbassadorButton
            ambassador={key}
            onClick={() => setAmbassadorCard(key)}
            className="w-32 md:w-48"
          />
        </Fragment>
      ))}
    </main>
  );
}
