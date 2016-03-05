import React from 'react'
import styles from './Profile.scss'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'

@connect(
  state => ({
    user_name: state.sendbird.user_name
  })
)
export default class Profile extends React.Component {

  render() {
    return (
      <nav className="text-center">
        <div className={styles.userContainer}>
          <span className={styles.user}>
            <p>{this.props.user_name}</p>
            <IndexLink to="/" className={styles.signout} />
          </span>
        </div>
      </nav>
    )
  }
}
