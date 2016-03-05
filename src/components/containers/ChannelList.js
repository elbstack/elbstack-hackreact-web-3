import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './ChannelList.scss'
import { listChannels } from '../../redux/actions/channels'

@connect(
  null,
  dispatch => ({
    listChannels: () => dispatch(listChannels())
  })
)
export default class ChannelList extends Component {

  componentWillMount() {
    this.props.listChannels()
  }

  render() {

    const content = <p>Lade Channels</p>

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {content}
        </div>
      </div>
    )
  }
}
