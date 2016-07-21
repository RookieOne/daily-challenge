export const ADD_COUNTER = 'ADD_COUNTER'
export const CHANGE_NEW_COUNTER_NAME = 'CHANGE_NEW_COUNTER_NAME'

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
