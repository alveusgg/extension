// utils
import { useEffect, useState, useRef } from 'react'

//components & hooks
import ActivationButtons from '../activationButtons/ActivationButtons'
import AmbassadorList from '../ambassadorList/AmbassadorList'
import useChatCommand from '../../../../utils/chatCommand'

//css
import styles from './overlay.module.css'

interface OverlayProps {
    sleeping: boolean,
    wake: (time: number) => void,
    settings: {
        disableChatPopup: boolean
    }
}
export default function Overlay(props: OverlayProps) {
    const [showAmbassadorList, setShowAmbassadorList] = useState(false)
    const chosenAmbassador = useChatCommand()
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    useEffect(() => {
        if(chosenAmbassador !== undefined && props.settings.disableChatPopup === false){
            console.log(props.settings.disableChatPopup)
            setShowAmbassadorList(true)
            timeoutRef.current = setTimeout(() => { setShowAmbassadorList(false) }, 6000)
            props.wake(6000)
        }
        return () => clearTimeout(timeoutRef.current as NodeJS.Timeout)

    }, [chosenAmbassador, props.wake])

    useEffect(() => {
        if (!props.sleeping) clearTimeout(timeoutRef.current as NodeJS.Timeout)
    }, [props.sleeping])

    return (
    <div className={`${styles.overlay} ${props.sleeping ? styles.hidden : styles.visible}`} >
        <ActivationButtons
            toggleShowAmbassadorList={() => setShowAmbassadorList(!showAmbassadorList)}
        />
        <AmbassadorList
            showAmbassadorList={showAmbassadorList}
            chatChosenAmbassador={chosenAmbassador?.slice(1)}
        />
    </div>
    )
}
