import alveus from "../../../../assets/alveus.png";

import styles from "./nav.module.scss";

import IconInfo from "../../../../components/icons/IconInfo";

interface NavProps {
  onWelcomeClick: () => void;
}

export default function Nav(props: NavProps) {
  const { onWelcomeClick } = props;

  return (
    <nav className={styles.nav}>
      <img src={alveus} alt="Alveus Logo" />
      <h1>Alveus Ambassadors</h1>
      <button className={styles.info} onClick={onWelcomeClick} title="Info">
        <IconInfo size="20" />
      </button>
    </nav>
  );
}
