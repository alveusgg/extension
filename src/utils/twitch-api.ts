import { useSyncExternalStore } from 'react'

type ChannelsResponse = {
  data: Array<ChannelInfo>
}

type ChannelInfo = {
  broadcaster_id: string
  broadcaster_login: string
  broadcaster_name: string
  broadcaster_language: string
  game_id: string
  game_name: string
  title: string
  delay: number
  tags: string[]
}

export async function fetchCurrentChannelInfo(auth: Twitch.ext.Authorized) {
  const url = new URL('https://api.twitch.tv/helix/channels')
  url.searchParams.set('broadcaster_id', auth.channelId)

  const response = await fetch(url, {
    headers: {
      'client-id': auth.clientId,
      'Authorization': `Extension ${auth.helixToken}`,
    }
  })

  const data = await response.json() as ChannelsResponse // TODO: validate schema?
  if (data?.data?.length) return data.data[0]

  return null
}


const authStore = {
  value: null as Twitch.ext.Authorized | null,
  listeners: [] as (() => void)[],
  subscribe: (listener: () => void) => {
    authStore.listeners = [...authStore.listeners, listener]
    return () => {
      authStore.listeners = authStore.listeners.filter(l => l !== listener)
    }
  },
  snapshot: () => authStore.value,
  update: (newAuth: Twitch.ext.Authorized) => {
    authStore.value = newAuth
    authStore.listeners.forEach(l => l())
  },
}

// Twitch auth callback may be called before React is ready, so we use an external store
export const useTwitchAuth = () => useSyncExternalStore(authStore.subscribe, authStore.snapshot)

export const bindTwitchAuth = () => {
  // If Twitch isn't available, do nothing
  if (!('Twitch' in window) || !window.Twitch.ext) return

  // Otherwise, listen for the auth callback
  window.Twitch.ext.onAuthorized((auth: Twitch.ext.Authorized) => {
    authStore.update(auth)
  })
}
