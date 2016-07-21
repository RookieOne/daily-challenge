import { combineReducers } from 'redux'
import { counters } from './counters'

const rootReducer = combineReducers({
  counters: counters
})

export default rootReducer
