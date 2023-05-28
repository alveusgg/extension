import AlveusLogo from '../../../../assets/alveus-logo.png';
import styles from './nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <img src={AlveusLogo} alt="Alveus Logo" />
      <h1>Alveus Ambassadors</h1>
    </nav>
  )
}
