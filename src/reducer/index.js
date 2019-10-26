import { combineReducers } from 'redux'
import { fetch_nasa_data_reducer } from './HomeReducer'

const allReducers =  combineReducers({
  data:fetch_nasa_data_reducer,
})
export default allReducers