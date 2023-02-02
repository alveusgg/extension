import { useCallback, useEffect, useState, useMemo } from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import AmbassadorData from '../assets/ambassadors.json'

/**
 * @description Some ambassadors have names with diacritics in them (Ex: Jalapeño).
 * Note: a diacritic is a mark added to a letter to change its sound or meaning (Ex: ñ).
 * This function creates a map of an ambassador with diacritics in their name and their name without diacritics.
 * (Ex: { jalapeno: jalapeño })
 * @returns a map of the normalized names and original names
 */
const getMapOfAmbassadorWithDiacritics = (): Map<string, string> => {
  //store names that have letters with diacritics in them
  const ambassadorsWithDiacriticsInNames = AmbassadorData.filter(
    (ambassador) =>{
      const ambassadorOriginalFirstName = ambassador.name.split(' ')[0].toLowerCase()
      const ambassadorFirstNameWithRemovedDiacritic = ambassadorOriginalFirstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

      return ambassadorOriginalFirstName !== ambassadorFirstNameWithRemovedDiacritic
    }
  )
  // a hashmap of the normalized names and their original names
  const diacriticMap = new Map<string, string>()
  ambassadorsWithDiacriticsInNames.forEach((ambassador) => {
    const ambassadorOriginalFirstName = ambassador.name.split(' ')[0].toLowerCase()
    const ambassadorFirstNameWithRemovedDiacritic = ambassadorOriginalFirstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    diacriticMap.set(ambassadorFirstNameWithRemovedDiacritic, ambassadorOriginalFirstName)
  })

  return diacriticMap
}

export default function useChatCommand(callback: (command: string) => void) {
  const commandsMap = useMemo<Map<string, string>>(() => {
    // Map the normalized names to their original names
    const commands = getMapOfAmbassadorWithDiacritics()

    // Add the original names to the map, pointing to themselves
    AmbassadorData.forEach((ambassador) => {
      const name = ambassador.name.split(' ')[0].toLowerCase()
      commands.set(name, name)
    })

    // Welcome is also a valid command
    commands.set('welcome', 'welcome')

    return commands
  }, [])

  const [client] = useState(new tmi.Client({
    connection: {
      secure: true,
      reconnect: true
    },
    channels: [
      'AbdullahMorrison', //! For testing purposes
      'Maya',
      'AlveusSanctuary'
    ]
  }))

  const messageHandler = useCallback((channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
    //ignore if user is not a moderator or broadcaster or if the user is not AbdullahMorrison
    if (!tags.mod && !tags.badges?.broadcaster && tags.username !== 'abdullahmorrison') return
    // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
    if (self || !msg.trim().startsWith('!')) return

    const commandName = msg.trim().toLowerCase().slice(1)
    const command = commandsMap.get(commandName)
    if (command) callback('!'+command)
  }, [commandsMap, callback])

  useEffect(() => {
    client.addListener('message', messageHandler)
    return () => {
      client.removeListener('message', messageHandler)
    }
  }, [client, messageHandler])

  const connectedHandler = useCallback(() => {
    console.log('*Twitch extension is connected to chat*')
  }, [])

  useEffect(() => {
    client.on('connected', connectedHandler)
    client.connect()
  }, [client, connectedHandler])
}
