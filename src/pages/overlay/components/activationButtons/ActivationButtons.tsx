import { classes } from '../../../../utils/classes'

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
      <button onClick={props.toggleShowAlveusIntro} className={classes(props.isAlveusIntroActive && styles.highlighted)}>
          <img src={Welcome} alt="Welcome" />
      </button>
      <button onClick={props.toggleShowAmbassadorList} className={classes(props.isAmbassadorListActive && styles.highlighted)}>
          <img src={Ambassadors} alt="Ambassadors" />
      </button>
    </div>
  )
}
