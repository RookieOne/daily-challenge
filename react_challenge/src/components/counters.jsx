import React from 'react'
import { connect } from 'react-redux'

@connect(
  state => state.counters
)
export default class Counters extends React.Component {
  render () {
    const { message } = this.props
    return (
      <div id="counters">
        <h1>Hello from React</h1>
        <h2>{message}</h2>
      </div>
    )
  }
}
