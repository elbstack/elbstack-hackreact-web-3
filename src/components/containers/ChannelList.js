import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './ChannelList.scss'
import { listChannels, joinChannel } from '../../redux/actions/channels'

@connect(
  state => ({
    channels: state.channels
  }),
  dispatch => ({
    listChannels: () => dispatch(listChannels()),
    joinChannel: (channelId) => dispatch(joinChannel(channelId))
  })
)
export default class ChannelList extends Component {

  componentWillMount() {
    this.props.listChannels()
  }

  onJoinChannel(channelId) {
    this.props.joinChannel(channelId)
  }

  render() {

    const content = this.props.channels !== undefined && this.props.channels.list !== undefined ?
      <ul>
        { Object.keys(this.props.channels.list).map( (channelId) => <li key={channelId} onClick={this.onJoinChannel.bind(this, channelId)}>{this.props.channels.list[channelId].name} ({this.props.channels.list[channelId].member_count}</li> )}
      </ul>
      : <p>Lade Channels</p>

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {content}
        </div>
      </div>
    )
  }
}
