// utils
import {useEffect, useState, useRef, useReducer} from "react"

//components & hooks
import ActivationButtons from "../activationButtons/ActivationButtons"
import AmbassadorList from "../ambassadorList/AmbassadorList"
import useChatCommand from "../../../../utils/chatCommand"

//css
import styles from "./overlay.module.css"
import {Map} from "../map/Map"

interface OverlayProps {
    settings: {
        disableChatPopup: boolean
    }
}
export type OverlayView = null | "ambassadors" | "map"
export type SelectionState = {
    selection?:
        | {
            type: "ambassador" | "enclosure" | "facility"
            id: string
        }
        | {
            type: "ambassadors",
            ids: Array<string>
        }
}
type SelectAction = {
    type: "select"
    payload: SelectionState["selection"]
}
export type SelectionAction = SelectAction
const reducer = (state: SelectionState, action: SelectionAction) => {
    switch (action.type) {
        case "select":
            return {
                ...state,
                selection: action.payload,
            }
    }

    return state
}
export default function Overlay(props: OverlayProps) {
    const [view, setView] = useState<OverlayView>(null)
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
    const [selectionState, dispatchSelection] = useReducer(reducer, {})

    useChatCommand((chosenAmbassador) => {
        if(chosenAmbassador && !props.settings.disableChatPopup){
            dispatchSelection({type: "select", payload: {type: "ambassador", id: chosenAmbassador}})
            setIsOverlayVisible(true)
            setView("ambassadors")

            // hide overlay after a few seconds
            timeoutRef.current = setTimeout(() => {
                setIsOverlayVisible(false)
                setView(null)
            }, 6000)
        }

        return () => {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current)
        }
    })

    // create mouse event listener to show/hide overlay if mouse is in the viewport
    useEffect(() => {
        let body = document.querySelector("body")
        //check if mouse is in the viewport
        if(body !== null){
            body.addEventListener("mouseleave", () => {
                setIsOverlayVisible(false)
            })
        }
        if(body !== null){
            body.addEventListener("mouseenter", () => {
                setIsOverlayVisible(true)
                clearTimeout(timeoutRef.current as NodeJS.Timeout)
            })
        }
    }, [])

    return (
    <div className={`${styles.overlay} ${isOverlayVisible? styles.visible : styles.hidden}`} >
        <ActivationButtons setView={setView} view={view} />
        <div className={styles.views}>
            <OverlayViewPanel visible={view === "ambassadors"}>
                <AmbassadorList
                    showAmbassadorList={view === "ambassadors"}
                    selectedAmbassadorId={selectionState.selection?.type === "ambassador" ? selectionState.selection.id : undefined}
                    setSelectedAmbassadorId={(id?: string) =>
                        dispatchSelection({
                            type: "select",
                            payload: id ? {type: "ambassador", id} : undefined,
                        })
                    }
                />
            </OverlayViewPanel>
            <OverlayViewPanel visible={view === "map"}>
                <Map setView={setView} selectionState={selectionState} dispatchSelection={dispatchSelection} />
            </OverlayViewPanel>
        </div>
    </div>
    )
}

interface OverlayViewPanelProps {
    visible: boolean
    children: React.ReactNode
}
function OverlayViewPanel(props: OverlayViewPanelProps) {
    return (
        <div className={`${styles.view} ${props.visible ? styles.visible : styles.hidden}`}>
            {props.children}
        </div>
    )
}