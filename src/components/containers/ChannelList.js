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

    const content = this.props.channels !== undefined && this.props.channels.list !== undefined ?
      <ul>
        { Object.keys(this.props.channels.list).map( (key) => <li key={key}>{this.props.channels.list[key].name}</li> )}
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
