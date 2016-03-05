import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './ChannelList.scss'
import { listChannels } from '../../redux/actions/channels'

@connect(
  state => ({
    channels: state.channels
  }),
  dispatch => ({
    listChannels: () => dispatch(listChannels())
  })
)
export default class ChannelList extends Component {

  componentWillMount() {
    this.props.listChannels()
  }

  render() {

    const content = this.props.channels !== undefined ? <p>Channels gefunden</p> : <p>Lade Channels</p>

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {content}
        </div>
      </div>
    )
  }
}
