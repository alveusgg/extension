import {useEffect} from 'react'
import tmi, {ChatUserstate} from 'tmi.js'

import ambassadorData from '../assets/ambassadors.json'

export default function useChatCommand(onCommand: (command: string) => void) {
    const ambassadorIds = ambassadorData.map((ambassador) => ambassador.id)

    const messageHandler = (channel: string, tags: ChatUserstate, msg: string, self: boolean) => {
        //ignore if user is not a moderator or broadcaster or test user
        if(!tags.mod && !tags.badges?.broadcaster && tags.username !== process.env.REACT_APP_TEST_CHANNEL) return
        // Ignore echoed messages (messages sent by the bot) and messages that don't start with '!'
        if (self || !msg.trim().startsWith('!')) return

        const commandName = msg.trim().toLowerCase().slice(1)
        if(ambassadorIds.find((id) => id === commandName)) {
            onCommand?.(commandName)
        }
    }
    const connectedHandler = () => {
        console.log('*Twitch extension is connected to chat*')
    }

    useEffect(() => {
        const channels = [
            'Maya',
            'AlveusSanctuary'
        ]
        if (process.env.REACT_APP_TEST_CHANNEL)
            channels.push(process.env.REACT_APP_TEST_CHANNEL)

        const client = new tmi.Client({
            connection: {
                secure: true,
                reconnect: true
            },
            channels
        })
        client.on('message', messageHandler)
        client.on('connected', connectedHandler)
        client.connect()

        return () => {
            client.disconnect();
        }
    }, [messageHandler])
}