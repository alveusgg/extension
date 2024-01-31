import { useCallback, type MouseEventHandler } from "react";

// import AmbassadorCard, {
//   type AmbassadorCardProps,
// } from "../../../../components/ambassadorCard/AmbassadorCard";

import styles from "./welcomeCard.module.scss";

interface WelcomeCardProps {
  onClose: () => void;
}

export default function WelcomeCard(props: WelcomeCardProps) {
  const { onClose } = props;

  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div className={styles.background} onClick={onClick}>
      <button
        className={styles.close}
        onClick={onClose}
        type="button"
        aria-label="Close"
      >
        &times;
      </button>
      Hi
    </div>
  );
}
