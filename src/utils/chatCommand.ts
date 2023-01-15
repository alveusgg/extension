import { useEffect, useState } from 'react'
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

export default function useChatCommand() {
    const [command, setCommand] = useState<string>()
    const ambassadorNames = AmbassadorData.map((ambassador) => ambassador.name.split(' ')[0].toLowerCase())

    const diacriticsMap: Map<string, string> = getMapOfAmbassadorWithDiacritics()

    const client = new tmi.Client({
        connection: {
            secure: true,
            reconnect: true
        },
        channels: [
            'AbdullahMorrison',
            'Maya',
            'AlveusSanctuary'
        ]
    })

    useEffect(() => {
        client.on('message', messageHandler)
        client.on('connected', connectedHandler)
        client.connect()
    }, [])

    const messageHandler = (channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
        //ignore if user is not a moderator or broadcaster or if the user is not AbdullahMorrison
        if(!tags.mod && !tags.badges?.broadcaster && tags.username !== 'abdullahmorrison') return
        // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
        if (self || !msg.trim().startsWith('#')) return

        const commandName = msg.trim().toLowerCase() 
        if(ambassadorNames.find((name) => name === commandName.slice(1))) {
            setCommand(commandName)
        }else if(diacriticsMap.get(commandName.slice(1))) { // Check if a user typed a name without diacritics (Ex: !jalapeno should be !Jalapeño)
            setCommand("!"+diacriticsMap.get(commandName.slice(1)))
        }
    }
    const connectedHandler = () => {
        console.log('*Twitch extension is connected to chat*')
    }

    return command
}