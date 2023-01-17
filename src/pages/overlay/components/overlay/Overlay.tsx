// utils
import { useEffect, useState, useRef } from 'react'

//components & hooks
import ActivationButtons from '../activationButtons/ActivationButtons'
import AmbassadorList from '../ambassadorList/AmbassadorList'
import useChatCommand from '../../../../utils/chatCommand'

//css
import styles from './overlay.module.css'

interface OverlayProps {
    settings: {
        disableChatPopup: boolean
    }
}
export default function Overlay(props: OverlayProps) {
    const [showAmbassadorList, setShowAmbassadorList] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const chosenAmbassador = useChatCommand()
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

    useEffect(() => {
        if(chosenAmbassador !== undefined && props.settings.disableChatPopup === false){
            console.log(props.settings.disableChatPopup)
            setIsOverlayVisible(true)
            setShowAmbassadorList(true)

            // hide overlay after a few seconds
            timeoutRef.current = setTimeout(() => {
                setIsOverlayVisible(false)
                setShowAmbassadorList(false)
            }, 6000)
        }
        return () => clearTimeout(timeoutRef.current as NodeJS.Timeout) 

    }, [chosenAmbassador])

    useEffect(() => {
        initMouseEventListener()
    }, [])

    // create mouse event listener to show/hide overlay if mouse is in the viewport
    const initMouseEventListener = () => {
        let body = document.querySelector("body")
        //check if mouse is in the viewport
        if(body !== null){
            body.addEventListener('mouseleave', () => {
                setIsOverlayVisible(false)
            })
        }
        if(body !== null){
            body.addEventListener('mouseenter', () => {
                setIsOverlayVisible(true)
                clearTimeout(timeoutRef.current as NodeJS.Timeout)
            })
        }
    }

    return (
    <div className={`${styles.overlay} ${isOverlayVisible? styles.visible : styles.hidden}`} >
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
