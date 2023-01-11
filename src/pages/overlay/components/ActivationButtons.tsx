//css & assets
import styles from './activationButtons.module.css'
import AlveusLogo from '../../../assets/alveus-logo.png';

/** 
 * @Description Activation buttons are buttons that are used to show parts of the overlay.
 */  
interface ActivationButtonProps {
  toggleShowAlveusIntro: () => void;
  toggleShowAnimalList: () => void;
}
export default function ActivationButtons(props: ActivationButtonProps) {

  return (
    <div className={styles.activationButtons}>
        <button onClick={props.toggleShowAlveusIntro}>
            <img src="" alt="A" />
        </button>
        <button onClick={props.toggleShowAnimalList}>
            <img src={AlveusLogo} alt="Alveus Logo" />
        </button>

        {/** Plan on adding another activation button to show non-ambassadors*/}
    </div>
  )
}