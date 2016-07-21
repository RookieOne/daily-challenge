import { ADD_COUNTER, CHANGE_NEW_COUNTER_NAME } from 'actions/counter'
import uuid from 'node-uuid'

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

export function counters (state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTER:
      return addCounter(state, action.name)
    case CHANGE_NEW_COUNTER_NAME:
      return changeNewCounterName(state, action.name)
    default:
      return state
  }
}
