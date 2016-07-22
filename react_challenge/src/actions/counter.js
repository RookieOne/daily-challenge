export const ADD_COUNTER = 'ADD_COUNTER'
export const CHANGE_NEW_COUNTER_NAME = 'CHANGE_NEW_COUNTER_NAME'
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

export function addCounter (name) {
  return {
    type: ADD_COUNTER,
    name
  }
}

export function changeNewCounterName (name) {
  return {
    type: CHANGE_NEW_COUNTER_NAME,
    name
  }
}

export function incrementCounter (name) {
  return {
    type: INCREMENT_COUNTER,
    name
  }
}

export function decrementCounter (name) {
  return {
    type: DECREMENT_COUNTER,
    name
  }
}
