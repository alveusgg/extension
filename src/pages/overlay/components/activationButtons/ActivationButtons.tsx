import Welcome from '../../../../assets/activationButtons/welcome.jpg';
import Ambassadors from '../../../../assets/activationButtons/ambassadors.jpg';

import styles from './activationButtons.module.css'

interface ActivationButtonProps {
  toggleShowAlveusIntro: () => void;
  toggleShowAmbassadorList: () => void;
  isAlveusIntroActive: boolean;
  isAmbassadorListActive: boolean;
}

export default function ActivationButtons(props: ActivationButtonProps) {
  return (
    <div className={styles.activationButtons}>
      <button onClick={props.toggleShowAlveusIntro} className={props.isAlveusIntroActive ? styles.highlighted : undefined}>
          <img src={Welcome} alt="Welcome" />
      </button>
      <button onClick={props.toggleShowAmbassadorList} className={props.isAmbassadorListActive ? styles.highlighted : undefined}>
          <img src={Ambassadors} alt="Ambassadors" />
      </button>
    </div>
  )
}
