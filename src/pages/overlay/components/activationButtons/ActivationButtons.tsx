//css & assets
import styles from './activationButtons.module.css'
import Welcome from '../../../../assets/activationButtons/welcome.jpg';
import Ambassadors from '../../../../assets/activationButtons/ambassadors.jpg';

/**
 * @Description Activation buttons are buttons that are used to show parts of the overlay.
 */
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

      {/** Plan on adding another activation button to show non-ambassadors*/}
    </div>
  )
}
