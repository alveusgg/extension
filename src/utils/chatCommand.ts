import { useEffect, useState } from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import AmbassadorData from '../assets/ambassadors.json'

export default function useChatCommand() {
    const [chosenAmbassadorId, setChosenAmbassadorId] = useState<string>()
    const ambassadorIds = AmbassadorData.map((ambassador) => ambassador.id)

    const client = new tmi.Client({
        connection: {
            secure: true,
            reconnect: true
        },
        channels: [
            // 'AbdullahMorrison', //! For testing purposes
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
        if (self || !msg.trim().startsWith('!')) return

        const ambassadorCommand = msg.trim().slice(1).toLowerCase()
        if(ambassadorIds.find((id) => id === ambassadorCommand)) {
            setChosenAmbassadorId(ambassadorCommand)
        }
    }
    const connectedHandler = () => {
        console.log('*Twitch extension is connected to chat*')
    }

    return chosenAmbassadorId
}