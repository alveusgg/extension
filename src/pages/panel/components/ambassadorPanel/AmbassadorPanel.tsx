import { useState, useEffect } from "react";

//components & hooks
import AmbassadorButton from "../../../../utils/global/ambassadorButton/AmbassadorButton";
import AmbassadorCardOverlay from "../ambassadorCardOverlay/AmbassadorCardOverlay";
import useChatCommand from "../../../../utils/chatCommand";

//css
import styles from './ambassadorPanel.module.css'

//data
import AmbassadorData from "../../../../assets/ambassadors.json";


export default function AmbassadorPanel() {
  const [ambassadors] = useState(AmbassadorData)
  const [cardAmbassadorId, setCardAmbassadorId] = useState<string | undefined>(undefined) // id of ambassador that will show up as a modal
  const chosenAmbassadorId = useChatCommand()

  useEffect(() => {
    if(chosenAmbassadorId){
      setCardAmbassadorId(chosenAmbassadorId)
    }
  }, [chosenAmbassadorId])

  return (
    <main className={styles.ambassadors}> 
      {ambassadors && ambassadors.map(ambassador => (
        <>
          {cardAmbassadorId === ambassador.id ?
            <AmbassadorCardOverlay
              ambassadorCard={{cardData: ambassador}}

              close={() => setCardAmbassadorId(undefined)}
            />
            : null
          }
          <AmbassadorButton
            key={ambassador.id}
            name={ambassador.name}
            species={ambassador.species}
            img={{
              src: ambassador.img.src,
              altText: ambassador.img.altText
            }}

            getCard={() => setCardAmbassadorId(ambassador.id)}
          />
        </>
      ))}
    </main>
  )
}
