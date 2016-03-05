import { SENDBIRD_CONNECT, SENDBIRD_CONNECT_ERROR, SENDBIRD_CONNECTED, SENDBIRD_SET_USER, SENDBIRD_JOIN_CHANNEL } from '../actionTypes'
import sendbird from 'sendbird'
import uuid from 'node-uuid'

function shouldConnect(state) {
  return !state.sendbird.connected && !state.sendbird.connecting
}

function requestConnect(appId, id, user) {

  return dispatch => {
    dispatch({
      type: SENDBIRD_SET_USER,
      guest_id: id,
      user_name: user
    })

    localStorage.setItem('sendbird.user_name', user)

    dispatch({
      type: SENDBIRD_CONNECT
    })

    sendbird.init({
      app_id: appId,
      guest_id: id,
      user_name: user,
      image_url: '',
      access_token: '',
      successFunc: function initSuccess() {
        dispatch({
          type: SENDBIRD_CONNECTED
        })
      },
      errorFunc: function initError(status, error) {
        dispatch({
          type: SENDBIRD_CONNECT_ERROR,
          status: status,
          error: error
        })
      }
    })
  }
}

function getGuestId() {
  // sendbird counts guest_ids as monthly active users
  // which we only have 1k to test with,
  // so save the guest id per client

  if (__CLIENT__ && window.localStorage) {

    const guestId = window.localStorage.getItem('sendbird.guest.id') || uuid.v1()
    window.localStorage.setItem('sendbird.guest.id', guestId)

    return guestId
  }

  return uuid.v1()
}

export function connectSendbird(user) {

  return (dispatch, getState) => {

    const state = getState()

    if (shouldConnect(state)) {
      return dispatch(requestConnect(state.sendbird.app_id, getGuestId(), user))
    }
  }
}

export function joinChannelSendbird(channelUrl) {

  return dispatch => {
    dispatch({
      type: SENDBIRD_JOIN_CHANNEL,
      channelUrl
    })

    sendbird.joinChannel(
      channelUrl,
      {
        'successFunc': function(data) {
          console.log(data)
          sendbird.connect({
            'successFunc': function(dataConnect) {
              console.log(dataConnect)
              // do something
            },
            'errorFunc': function(status, error) {
              console.log(status, error)
              // do something
            }
          })
          // do something
        },
        'errorFunc': function(status, error) {
          console.log(status, error)
          // do something
        }
      }
    )
  }
}
