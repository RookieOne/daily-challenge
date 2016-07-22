import { ADD_COUNTER, CHANGE_NEW_COUNTER_NAME, INCREMENT_COUNTER } from 'actions/counter'
import uuid from 'node-uuid'
import _ from 'lodash'

const initialState = {
  counters: [],
  newCounterName: ''
}

const addCounter = (state) => {
  const counters = [...state.counters, { id: uuid.v4(), name: state.newCounterName, count: 0 }]
  return {
    ...state,
    newCounterName: '',
    counters: counters
  }
}

const changeNewCounterName = (state, newCounterName) => {
  return {
    ...state,
    newCounterName: newCounterName
  }
}

const incrementCounter = (state, counterName) => {
  let i = _.findIndex(state.counters, { name: counterName })
  const counter = state.counters[i]
  let newCounter = {...counter, count: counter.count + 1}
  let counters = [
    ...state.counters.slice(0, i),
    newCounter,
    ...state.counters.slice(i + 1, state.counters.length)
  ]
  return {
    ...state,
    counters: counters
  }
}

export function counters (state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return addCounter(state, action.name)
    case CHANGE_NEW_COUNTER_NAME:
      return changeNewCounterName(state, action.name)
    case INCREMENT_COUNTER:
      return incrementCounter(state, action.name)
    default:
      return state
  }
}
