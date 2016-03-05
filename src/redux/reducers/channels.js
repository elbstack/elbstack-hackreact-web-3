import { SENDBIRD_LIST_CHANNELS, JOIN_CHANNEL } from '../actionTypes'

export default function channels(state = {joined: []}, action) {
  switch (action.type) {
    case SENDBIRD_LIST_CHANNELS:
      return Object.assign(
        {},
        state,
        {
          page: action.data.page,
          next: action.data.next,
          list: action.data.channels.reduce((memo, channel)=> ({
            ...memo,
            [channel.id]: channel
          }), {})
        }
      )
    case JOIN_CHANNEL:
      const joined = state.joined
      const channelId = action.channelId
      if (joined.indexOf(channelId) !== -1) {
        return state
      }

      joined.push(channelId)

      return Object.assign(
        {},
        state,
        {
          joined
        }
      )
    default:
      return state
  }
}
