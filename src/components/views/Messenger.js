import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamLogo from '../elements/TeamLogo'
import Profile from '../elements/Profile'
import ListChannelsBtn from '../elements/ListChannelsBtn'
import JoinedChannelList from '../elements/JoinedChannelList'
import IntroText from '../elements/IntroText'
import styles from './Messenger.scss'

@connect(
  state => ({
    sendbird: state.sendbird
  })
)
export default class Messenger extends Component {

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          <TeamLogo />
          <Profile />
          <ListChannelsBtn />
          <JoinedChannelList />
        </div>
        <div className={styles.chat}>
          <IntroText />
        </div>
      </div>
    )
  }
}
