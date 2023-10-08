import alveus from "../../../../assets/alveus.png";

import styles from "./nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <img src={alveus} alt="Alveus Logo" />
      <h1>Alveus Ambassadors</h1>
    </nav>
  );
}
