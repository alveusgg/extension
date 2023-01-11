// utils
import { useEffect, useState } from 'react'

//components & hooks
import ActivationButtons from './components/ActivationButtons'
import AmbassadorList from './components/AmbassadorList'
import AlveusIntro from './components/AlveusIntro'
import useChatCommand from '../../utils/chatCommand'

//css
import styles from './overlay.module.css'

export default function Overlay() {
    const [showAlveusIntro, setShowAlveusIntro] = useState(false)
    const [showAnimalList, setShowAnimalList] = useState(false)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const chosenAmbassador = useChatCommand()

    useEffect(() => {
        if(chosenAmbassador !== undefined){
            setIsOverlayVisible(true)
            setShowAnimalList(true)
        }
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
            toggleShowAnimalList={() => setShowAnimalList(!showAnimalList)}
            toggleShowAlveusIntro={() => setShowAlveusIntro(!showAlveusIntro)}
        />
        <AlveusIntro
            showAlveusIntro={showAlveusIntro}
        />
        <AmbassadorList
            showAnimalList={showAnimalList}
            chatChosenAmbassador={chosenAmbassador?.slice(1)}
        />
    </div>
    )
}
