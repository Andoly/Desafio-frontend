import { combineReducers } from 'redux'
import listTasks from './reducer'

export default combineReducers({
  tasks: listTasks
})