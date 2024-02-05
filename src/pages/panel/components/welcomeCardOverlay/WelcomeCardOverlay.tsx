import { useCallback, type MouseEventHandler } from "react";

import Welcome from "../../../../components/welcome/Welcome";

import styles from "./welcomeCardOverlay.module.scss";

interface WelcomeCardOverlayProps {
  onClose: () => void;
}

export default function WelcomeCardOverlay(props: WelcomeCardOverlayProps) {
  const { onClose } = props;

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div className={styles.background} onClick={onClick}>
      <Welcome className={styles.overlay} />
    </div>
  );
}
