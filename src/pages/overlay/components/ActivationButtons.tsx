import AlveusLogo from '../../../assets/alveus-logo.png';

import styles from './activationButtons.module.css'

/** 
 * @Description Activation buttons are buttons that are used to activate parts of the overlay.
 */  
interface ActivationButtonProps {
  toggleShowAmbassadorList: () => void;
}
export default function ActivationButtons(props: ActivationButtonProps) {

  return (
    <div className={styles.activationButtons}>
        <button onClick={props.toggleShowAmbassadorList}>
            <img src={AlveusLogo} alt="Alveus Logo" />
        </button>

        {/** Plan on adding another activation button to show non-ambassadors*/}
    </div>
  )
}