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

    const content = <span>no joined channels</span>

    return (
      <div className={styles.container}>
        {content}
      </div>
    )
  }
}
