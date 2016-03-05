import React, { Component } from 'react'
import styles from './JoinedChannelList.scss'
import { connect } from 'react-redux'

@connect(
  state => ({
    channels: state.channels,
  })
)
export default class JoinedChannelList extends Component {

  render() {

    const content = this.props.channels.joined !== undefined ?
      <ul>
        { this.props.channels.joined.map( (channelId) => <li key={channelId}>{this.props.channels.list[channelId].name} ({this.props.channels.list[channelId].member_count})</li> )}
      </ul>
      : <span>no joined channels</span>

    return (
      <div className={styles.container}>
        {content}
      </div>
    )
  }
}
