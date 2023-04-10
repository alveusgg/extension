//components & hooks
import { useState, useEffect, useCallback, Fragment } from 'react'
import AmbassadorButton from '../../../../utils/global/ambassadorButton/AmbassadorButton'
import AmbassadorCardOverlay from '../ambassadorCardOverlay/AmbassadorCardOverlay'
import useChatCommand from '../../../../utils/chatCommand'

//css
import styles from './ambassadorPanel.module.css'

//data
import { ambassadorEntries, type AmbassadorKey } from '@alveusgg/data/src/ambassadors/core'

export default function AmbassadorPanel() {
  const [ambassadorCard, setAmbassadorCard] = useState<AmbassadorKey>()

  // Allow chat commands to select an ambassador
  const [chosenAmbassador, setChosenAmbassador] = useState<string>()
  useChatCommand(useCallback((command: string) => {
    setChosenAmbassador(command.slice(1))
  }, []))
  useEffect(() => {
    if (chosenAmbassador !== undefined)
      setAmbassadorCard(ambassadorEntries.find(([, ambassador]) => ambassador.name.split(" ")[0].toLowerCase() === chosenAmbassador)?.[0])
  }, [chosenAmbassador])

  return (
    <main className={styles.ambassadors}>
      {ambassadorEntries.map(([key, ambassador]) => (
        <Fragment key={key}>
          {ambassadorCard === key && (
            <AmbassadorCardOverlay
              ambassadorCard={{ ambassadorKey: key, ambassador }}
              close={() => setAmbassadorCard(undefined)}
            />
          )}

          <AmbassadorButton
            ambassadorKey={key}
            ambassador={ambassador}
            ClassName={styles.item}
            getCard={() => setAmbassadorCard(key)}
          />
        </Fragment>
      ))}
    </main>
  )
}
