// utils
import { useEffect, useState } from 'react'

//components
import ActivationButtons from './components/ActivationButtons'
import AmbassadorList from './components/AmbassadorList'

//css
import styles from './overlay.module.css'

export default function Overlay() {
    const [showAnimalList, setShowAnimalList] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        initMouseEventListener()
    }, [])

    // create mouse event listener to show/hide overlay if mouse is in the viewport
    const initMouseEventListener = () => {
        let body = document.querySelector("body")
        //check if mouse is in the viewport
        if(body !== null){
            body.addEventListener('mouseleave', () => {
                setIsVisible(false)
            })
        }
        if(body !== null){
            body.addEventListener('mouseenter', () => {
                setIsVisible(true)
            })
        }
    }

    return (
    <div className={`${styles.overlay} ${isVisible? styles.visible : styles.hidden}`} >
        <ActivationButtons 
            toggleShowAnimalList={() => setShowAnimalList(!showAnimalList)}
        />
        <AmbassadorList
            showAnimalList={showAnimalList}
        />
    </div>
    )
}
