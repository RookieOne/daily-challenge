import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as counterActionsCreator from 'actions/counter'

@connect(
  state => state.counters,
  dispatch => bindActionCreators(counterActionsCreator, dispatch)
)

export default class AddCounter extends React.Component {
  static propTypes = {
    newCounterName: React.PropTypes.string,
    changeNewCounterName: React.PropTypes.func,
    addCounter: React.PropTypes.func
  }
  changeNewCounterName = (evt) => {
    this.props.changeNewCounterName(evt.target.value)
  }
  addCounter = () => {
    this.props.addCounter('foo')
  }
  render () {
    const { newCounterName } = this.props
    return (
      <div id="add-counter">
        <h1>Add Counter</h1>
        <input name='new-counter-name' onChange={this.changeNewCounterName} value={newCounterName} />
        <button id='add-counter-btn' onClick={this.addCounter}>
          Add Counter
        </button>
      </div>
    )
  }
}
