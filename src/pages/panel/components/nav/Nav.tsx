import { useState } from "react";

import alveus from "../../../../assets/alveus.png";

import styles from "./nav.module.scss";

import IconInfo from "../../../../components/icons/IconInfo";
import WelcomeCardOverlay from "../welcomeCardOverlay/WelcomeCardOverlay";

export default function Nav() {
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <img src={alveus} alt="Alveus Logo" />
      <h1>Alveus Ambassadors</h1>
      <button
        className={styles.info}
        onClick={() => setShowWelcome(true)}
        title="Info"
      >
        <IconInfo size="20" />
      </button>

      <WelcomeCardOverlay
        show={showWelcome}
        onClose={() => setShowWelcome(false)}
      />
    </nav>
  );
}
