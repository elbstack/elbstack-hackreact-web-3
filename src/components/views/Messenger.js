import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamLogo from '../elements/TeamLogo'
import Profile from '../elements/Profile'
import ListChannelsBtn from '../elements/ListChannelsBtn'
import JoinedChannelList from '../elements/JoinedChannelList'
import IntroText from '../elements/IntroText'
import styles from './Messenger.scss'
import ChannelList from '../containers/ChannelList'

@connect(
  state => ({
    sendbird: state.sendbird
  })
)
export default class Messenger extends Component {
  state = {
    channelListOpen: false
  }

  onChannelList() {
    debugger
    this.setState({
      channelListOpen: !this.state.channelListOpen
    })
  }

  render() {
    const channelList = this.state.channelListOpen ? <ChannelList /> : null

    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <TeamLogo />
          <Profile />
          <ListChannelsBtn onClick={this.onChannelList.bind(this)}/>
          <JoinedChannelList />
        </div>
        <div className={styles.chat}>
          <IntroText />
          { channelList }
        </div>
      </div>
    )
  }
}
