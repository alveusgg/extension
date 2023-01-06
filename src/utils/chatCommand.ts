import { useEffect, useState } from 'react'
import tmi, { ChatUserstate } from 'tmi.js'
import AmbassadorData from '../assets/animals.json'

export default function useChatCommand() {
    const [command, setCommand] = useState<string>()
    const ambassadorNames = AmbassadorData.map((ambassador) => ambassador.name.split(' ')[0].toLowerCase())

    const client = new tmi.Client({channels: ['AbdullahMorrison']})

    useEffect(() => {
        client.on('message', messageHandler)
        client.on('connected', connectedHandler)
        client.connect()
    }, [])

    const messageHandler = (target: string, context: ChatUserstate, msg: string, self: boolean) => {
        if (self) return

        const commandName = msg.trim().toLowerCase()
        if(commandName.startsWith('!') && ambassadorNames.find((name) => name === commandName.slice(1))) {
            setCommand(commandName)
        }
    }
    const connectedHandler = () => {
        console.log('*Twitch extension is connected to chat*')
    }

    return command
}