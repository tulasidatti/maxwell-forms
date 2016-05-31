import { combineReducers } from 'redux'

import { FORMS_SUCCESS } from '../actions'
import user from './user'

function forms(state = [], action) {
	switch (action.type) {
	case "FORMS_SUCCESS":
		return action.forms
		break;   
	default:
		return state
		break;
	}
}

module.exports = combineReducers({
	forms,
	user
})
   