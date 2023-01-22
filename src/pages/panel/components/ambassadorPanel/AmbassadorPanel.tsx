//components & hooks
import AmbassadorButton from "../../../../utils/global/ambassadorButton/AmbassadorButton";
import AmbassadorCardOverlay from "../ambassadorCardOverlay/AmbassadorCardOverlay";
import useChatCommand from "../../../../utils/chatCommand";

//css
import styles from './ambassadorPanel.module.css'

//data
import { useState } from "react";
import AmbassadorData from "../../../../assets/ambassadors.json";


export default function AmbassadorPanel() {
  const [ambassadors] = useState(AmbassadorData)
  const [selectedAmbassador, setSelectedAmbassador] = useState<string | null>(null) //id of ambassador that will show up as a modal

  useChatCommand((chosenAmbassador) => {
    setSelectedAmbassador(ambassadors.find(ambassador => ambassador.id === chosenAmbassador)?.id || null)
  })

  return (
    <main className={styles.ambassadors}> 
      {ambassadors && ambassadors.map(ambassador => (
        <>
          {selectedAmbassador === ambassador.id ?
            <AmbassadorCardOverlay
              ambassadorCard={{cardData: ambassador}}

              close={()=>setSelectedAmbassador(null)}
            />
            : null
          }
          <div className={styles.item}>
            <AmbassadorButton
              key={ambassador.id} // every ambassador will have a unique name
              name={ambassador.id}
              species={ambassador.species}
              img={{
                src: ambassador.img.src,
                altText: ambassador.img.altText
              }}

              getCard={()=>setSelectedAmbassador(ambassador.id)}
            />
          </div>
        </>
      ))}
    </main>
  )
}
