import React, { useCallback, type MouseEventHandler } from "react";

import AmbassadorCard, {
  type AmbassadorCardProps,
} from "../../../../components/ambassadorCard/AmbassadorCard";
import styles from "./ambassadorCardOverlay.module.scss";

interface AmbassadorCardOverlayProps {
  ambassadorCard: Omit<AmbassadorCardProps, "onClose" | "className">;
  onClose: () => void;
}

export default function AmbassadorCardOverlay(
  props: AmbassadorCardOverlayProps,
) {
  const { ambassadorCard, onClose } = props;

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div className={styles.background} onClick={onClick}>
      <AmbassadorCard
        {...ambassadorCard}
        onClose={onClose}
        className={styles.ambassadorCard}
      />
    </div>
  );
}
