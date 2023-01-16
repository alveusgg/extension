// utils
import { useEffect, useState } from 'react'

//components & hooks
import ActivationButtons from '../activationButtons/ActivationButtons'
import AmbassadorList from '../ambassadorList/AmbassadorList'
import useChatCommand from '../../../../utils/chatCommand'

//css
import styles from './overlay.module.css'

export default function Overlay() {
    const [showAmbassadorList, setShowAmbassadorList] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const chosenAmbassador = useChatCommand()

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined 
        if(chosenAmbassador !== undefined){
            setIsOverlayVisible(true)
            setShowAmbassadorList(true)

            // hide overlay after a few seconds
            timeout = setTimeout(() => {
                setIsOverlayVisible(false)
                setShowAmbassadorList(false)
            }, 10000)
        }
        return () => clearTimeout(timeout as NodeJS.Timeout) 

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
