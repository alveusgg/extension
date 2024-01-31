import alveus from "../../../../assets/alveus.png";

import styles from "./nav.module.scss";

import IconInfo from "../../../../components/icons/IconInfo";

interface NavProps {
  onShowWelcomeCardClicked: () => void;
}

export default function Nav({ onShowWelcomeCardClicked }: NavProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.filler} />
      <img src={alveus} alt="Alveus Logo" />
      <h1>Alveus Ambassadors</h1>
      <button
        className={styles.info}
        onClick={() => onShowWelcomeCardClicked()}
        title="Info"
      >
        <IconInfo size="20" />
      </button>
    </nav>
  );
}
