import { useState, useCallback, Fragment } from "react";

import AmbassadorButton from "../../../../components/ambassadorButton/AmbassadorButton";

import {
  isAmbassadorKey,
  useAmbassadors,
  type AmbassadorKey,
} from "../../../../utils/ambassadors";

import useChatCommand from "../../../../hooks/useChatCommand";

import AmbassadorCardOverlay from "../ambassadorCardOverlay/AmbassadorCardOverlay";

import styles from "./ambassadorPanel.module.scss";

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
    <main className={styles.ambassadors}>
      {ambassadors.map(([key, ambassador]) => (
        <Fragment key={key}>
          {ambassadorCard === key && (
            <AmbassadorCardOverlay
              ambassadorCard={{ ambassador: key }}
              onClose={() => setAmbassadorCard(undefined)}
            />
          )}

          <AmbassadorButton
            ambassadorKey={key}
            ambassador={ambassador}
            onClick={() => setAmbassadorCard(key)}
            className={styles.item}
          />
        </Fragment>
      ))}
    </main>
  );
}
