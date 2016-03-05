import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SendbirdConnect from '../containers/SendbirdConnect'
import styles from './Home.scss'

export default class Home extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col md={12} className="text-center">
            <h1 className={styles.heading}>
              hackreact messenger
            </h1>
            <SendbirdConnect />
          </Col>
        </Row>
      </Grid>
    )
  }
}
