import React from 'react'
import { connect } from 'react-redux'
import AddCounter from 'components/add-counter'
import { bindActionCreators } from 'redux'
import * as counterActionsCreator from 'actions/counter'

const Counter = (props) => {
  return (
    <li id={`counter-id-${props.counter.id}`}>
      <span className="counter-name">
        {props.counter.name}
      </span>
      <span className="counter-count">
        {props.counter.count}
      </span>
      <button name="increment-btn" onClick={() => { props.incrementCount(props.counter.name) }}>+</button>
    </li>
  )
}

@connect(
  state => state.counters,
  dispatch => bindActionCreators(counterActionsCreator, dispatch)
)

export default class Counters extends React.Component {
  static propTypes = {
    counters: React.PropTypes.array,
    incrementCounter: React.PropTypes.func
  }
  incrementCount = (counterName) => {
    console.log('inc', counterName)
    this.props.incrementCounter(counterName)
  }
  renderCounters () {
    const { counters } = this.props
    return counters.map((c) => <Counter key={c.id}
      counter={c}
      incrementCount={this.incrementCount}
    />)
  }
  render () {
    return (
      <div id="counters">
        <h1>Counter App</h1>
        <ul className="counters">
          {this.renderCounters()}
        </ul>
        <AddCounter />
      </div>
    )
  }
}
