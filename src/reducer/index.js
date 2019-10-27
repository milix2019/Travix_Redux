import { combineReducers } from 'redux'
import { get_notes_reducer } from './HomeReducer'

const allReducers = combineReducers({
  data: get_notes_reducer,
})
export default allReducers