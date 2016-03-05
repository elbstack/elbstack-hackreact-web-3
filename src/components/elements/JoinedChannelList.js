import React, { Component } from 'react'
import styles from './JoinedChannelList.scss'
import { connect } from 'react-redux'
import { joinChannelSendbird } from '../../redux/actions/sendbird'

@connect(
  state => ({
    channels: state.channels,
  }),
  dispatch => ({
    joinChannel: (channelUrl) => dispatch(joinChannelSendbird(channelUrl))
  })
)
export default class JoinedChannelList extends Component {

  render() {

    const content = this.props.channels.joined !== undefined && this.props.channels.joined.length > 0 ?
      <ul>
        { this.props.channels.joined.map( (channelId) => <li key={channelId} onClick={this.props.joinChannel(this.props.channels.list[channelId].channel_url)}>{this.props.channels.list[channelId].name} ({this.props.channels.list[channelId].member_count})</li> )}
      </ul>
      : <p className={styles.noJoinedChannels}>no joined channels</p>

    return (
      <div className={styles.container}>
        {content}
      </div>
    )
  }
}
