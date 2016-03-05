import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { connectSendbird } from '../../redux/actions/sendbird'
import styles from './SendbirdConnect.scss'

@connect(
  state => ({
    sendbird: state.sendbird
  }),
  dispatch => ({
    connect: (id, user) => dispatch(connectSendbird(id, user)),
    goToChat: () => dispatch(pushState(null, '/messenger'))
  })
)
export default class SendbirdConnect extends Component {

  onConnect() {
    if (this.state && this.state.userName) {
      this.props.connect(this.state.userName)
      this.props.goToChat()
    }
  }

  onChange(event) {
    this.setState({
      userName: event.target.value
    })
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.onConnect()
    }
  }

  render() {
    return (
      <div>
        <input type="text"
               placeholder="nickname"
               className={styles.loginName}
               disabled={this.props.sendbird.connecting}
               onKeyUp={this.onKeyUp.bind(this)}
               onChange={this.onChange.bind(this)} />

        <div className={styles.enter} onClick={this.onConnect.bind(this)}>enter</div>
      </div>
    )
  }
}
