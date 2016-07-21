import React from 'react'
import { connect } from 'react-redux'
import AddCounter from 'components/add-counter'

const Counter = (props) => {
  return (
    <li>
      <span className="counter-name">
        {props.counter.name}
      </span>
      <span className="counter-count">
        {props.counter.count}
      </span>
    </li>
  )
}

@connect(
  state => state.counters
)

export default class Counters extends React.Component {
  static propTypes = {
    counters: React.PropTypes.array
  }
  renderCounters () {
    const { counters } = this.props
    return counters.map((c) => <Counter key={c.id} counter={c} />)
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
