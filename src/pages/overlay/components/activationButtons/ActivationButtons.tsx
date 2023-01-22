import AlveusLogo from '../../../../assets/alveus-logo.png';

import styles from './activationButtons.module.css'
import {OverlayView} from "../overlay/Overlay";

/** 
 * @Description Activation buttons are buttons that are used to activate parts of the overlay.
 */  
interface ActivationButtonProps {
    view: OverlayView
    setView: (view: OverlayView) => void
}
export default function ActivationButtons(props: ActivationButtonProps) {

  return (
    <div className={styles.activationButtons}>
        <button onClick={() => props.setView(props.view === 'ambassadors' ? null : 'ambassadors')}>
            <img src={AlveusLogo} alt="Alveus Logo" />
        </button>
        <button onClick={() => props.setView(props.view === 'map' ? null : 'map')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.9 122.9" style={{margin: '20%'}}>
                <path fill="white" fillRule="evenodd" d="M57 73.1a1.6 1.6 0 0 1-2 .1 65.3 65.3 0 0 1-16-14.4 51.3 51.3 0 0 1-11-23.4 31 31 0 0 1 4-22 27 27 0 0 1 6-6.6A29.2 29.2 0 0 1 56.4 0a26 26 0 0 1 17.4 7.1 26 26 0 0 1 4.7 5.7c4.2 7 5.2 16 3.3 25.1a55.3 55.3 0 0 1-24.9 35.2ZM38 74v27.8l30 13V78.9a65.2 65.2 0 0 0 6.5-5.7v41.2l25-12.6v-56L90 49.5a61.6 61.6 0 0 0 2.4-7.8l9.3-3.6a3.2 3.2 0 0 1 4.1 1.9 3.2 3.2 0 0 1 .2 1.2v62.7a3.2 3.2 0 0 1-2 3l-31.2 15.6a3.2 3.2 0 0 1-2.9 0l-35-15.1-30.1 15.1a3.2 3.2 0 0 1-4.4-1.4 3.3 3.3 0 0 1-.3-1.4V53.2a3.2 3.2 0 0 1 2.3-3l16.4-6.4a58.6 58.6 0 0 0 2.2 6L6.5 55.5v59l25-12.6V67.1a76.3 76.3 0 0 0 6.4 6.8ZM55 14.2A13.7 13.7 0 1 1 41.5 28a13.7 13.7 0 0 1 13.8-13.7Z" />
            </svg>
        </button>

        {/** Plan on adding another activation button to show non-ambassadors*/}
    </div>
  )
}