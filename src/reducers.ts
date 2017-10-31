import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { profileLoginReducer } from './modules/ProfileLogin'
import { profilePasswordReducer } from './modules/ProfilePasswordForget'
import { modalReducer } from './modules/CustomModal'
import { registrationReducer } from './modules/SignUp'

export default combineReducers({
	routing: routerReducer,
	form: reduxFormReducer,
	profileLogin: profileLoginReducer,
	registration: registrationReducer,
	modal: modalReducer,
	profilePassword: profilePasswordReducer
})
