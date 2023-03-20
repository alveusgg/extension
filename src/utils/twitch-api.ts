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

export async function fetchCurrentChannelInfo(channelId: string, auth: Twitch.ext.Authorized) {
  const params = new URLSearchParams()
  params.set('broadcaster_id', channelId)

  const response = await fetch(`https://api.twitch.tv/helix/channels?${params}`, {
    headers: {
      'client-id': auth.clientId,
      'Authorization': `Extension ${auth.helixToken}`,
    }
  })

  const data = await response.json() as ChannelsResponse // TODO: validate schema?
  if (data?.data?.length) {
    return data.data[0]
  }

  return null
}
