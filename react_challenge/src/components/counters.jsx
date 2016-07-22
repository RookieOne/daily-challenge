import React from 'react'
import { connect } from 'react-redux'
import AddCounter from 'components/add-counter'
import { bindActionCreators } from 'redux'
import * as counterActionsCreator from 'actions/counter'

export class Counter extends React.Component {
  static propTypes = {
    counter: React.PropTypes.object,
    incrementCount: React.PropTypes.func,
    decrementCount: React.PropTypes.func
  }
  render () {
    const { counter, incrementCount, decrementCount } = this.props
    return (
      <li id={`counter-id-${counter.id}`}>
        <span className="counter-name">
          {counter.name}
        </span>
        <span className="counter-count">
          {counter.count}
        </span>
        <button className="btn btn-default" name="increment-btn" onClick={() => { incrementCount(counter.name) }}>+</button>
        <button className="btn btn-default" name="decrement-btn" onClick={() => { decrementCount(counter.name) }}>-</button>
      </li>
    )
  }
}

@connect(
  state => state.counters,
  dispatch => bindActionCreators(counterActionsCreator, dispatch)
)

export default class Counters extends React.Component {
  static propTypes = {
    totalCounts: React.PropTypes.number,
    counters: React.PropTypes.array,
    incrementCounter: React.PropTypes.func,
    decrementCounter: React.PropTypes.func
  }
  incrementCount = (counterName) => {
    this.props.incrementCounter(counterName)
  }
  decrementCount = (counterName) => {
    this.props.decrementCounter(counterName)
  }
  renderCounters () {
    const { counters } = this.props
    return counters.map((c) => <Counter key={c.id}
      counter={c}
      incrementCount={this.incrementCount}
      decrementCount={this.decrementCount}
    />)
  }
  render () {
    const { totalCounts } = this.props
    return (
      <div id="counters">
        <h1>Counter App</h1>
        <h3>Total: <span id="totalCounts">{totalCounts}</span></h3>
        <ul className="counters">
          {this.renderCounters()}
        </ul>
        <AddCounter />
      </div>
    )
  }
}
