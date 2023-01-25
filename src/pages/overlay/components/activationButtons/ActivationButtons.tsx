//css & assets
import styles from './activationButtons.module.css'
import Welcome from '../../../../assets/activationButtons/welcome.jpg';
import Ambassadors from '../../../../assets/activationButtons/ambassadors.jpg';
import AlveusLogo from '../../../../assets/alveus-logo.png';

/** 
 * @Description Activation buttons are buttons that are used to show parts of the overlay.
 */  
interface ActivationButtonProps {
  toggleShowAlveusIntro: () => void;
  toggleShowAmbassadorList: () => void;
}
export default function ActivationButtons(props: ActivationButtonProps) {

  return (
    <div className={styles.activationButtons}>
        <button onClick={props.toggleShowAlveusIntro}>
            <img src={Welcome} alt="Welcome" />
        </button>
        <button onClick={props.toggleShowAmbassadorList}>
            <img src={Ambassadors} alt="Ambassadors" />
        </button>

        {/** Plan on adding another activation button to show non-ambassadors*/}
    </div>
  )
}