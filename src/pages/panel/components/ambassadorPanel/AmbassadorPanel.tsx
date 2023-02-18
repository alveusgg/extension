//components & hooks
import AmbassadorButton from "../../../../utils/global/ambassadorButton/AmbassadorButton";
import AmbassadorCardOverlay from "../ambassadorCardOverlay/AmbassadorCardOverlay";
import useChatCommand from "../../../../utils/chatCommand";

//css
import styles from './ambassadorPanel.module.css'

//data
import { useState, useEffect, useCallback } from "react"
import AmbassadorData from "../../../../assets/ambassadors.json";


export default function AmbassadorPanel() {
  const [ambassadors] = useState(AmbassadorData)
  const [ambassadorCard, setAmbassadorCard] = useState("") //name of ambassador that will show up as a modal

  const [chosenAmbassador, setChosenAmbassador] = useState<string | undefined>(undefined)
  useChatCommand(useCallback((command: string) => {
    setChosenAmbassador(command.slice(1))
  }, []))

  useEffect(() => {
    if (chosenAmbassador !== undefined)
      setAmbassadorCard(ambassadors.find(ambassador => ambassador.name.split(" ")[0].toLowerCase() === chosenAmbassador)?.name || "")
  }, [chosenAmbassador, ambassadors])

  function handleClose(): void {
    setAmbassadorCard("")
  }
  function handleGetCard(name: string): void {
    setAmbassadorCard(name)
  }

  return (
    <main className={styles.ambassadors}>
      {ambassadors && ambassadors.map(ambassador => (
        <>
          {ambassadorCard === ambassador.name ? (
            <AmbassadorCardOverlay
              ambassadorCard={{
                cardData: ambassador,
                close: handleClose
              }}
              close={handleClose}
            />
          ) : null}
          <AmbassadorButton
            key={ambassador.name} // every ambassador will have a unique name
            name={ambassador.name}
            species={ambassador.species}
            img={{
              src: ambassador.img.src,
              altText: ambassador.img.altText
            }}
            ClassName={styles.item}

            getCard={()=>handleGetCard(ambassador.name)}
          />
        </>
      ))}
    </main>
  )
}
