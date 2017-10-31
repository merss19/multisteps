import {submitData} from './api'
import {LoginFormData, StateProfileLogin, Action} from './interfaces'
import {Dispatch} from 'redux'
import * as Immutable from 'immutable'

// Constant
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEESS = 'LOGIN_SUCCEESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// Action Creators
const request = (): Action => ({
	type: LOGIN_REQUEST,
})
const success = (data: any): Action => ({
	type: LOGIN_SUCCEESS,
	data
})

const failure = (): Action => ({
	type: LOGIN_FAILURE,
})

export const submitLogin = (data: LoginFormData) => (dispatch: Dispatch<StateProfileLogin>) => {
	dispatch(request())
	submitData(data)
		.then(response => response.json())
		.then(res => {
			const data = res.data
			if (data && res.errorCode === 1) {
				dispatch(success(data))
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}

// Reducer
const initialState: StateProfileLogin = {
	isFetching: false,
	isLoad: false,
	profile: {},
	isError: false
}
const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return state.merge({
				isFetching: true,
				isError: false,
				isLoad: false
			})

		case LOGIN_SUCCEESS:
			return state.merge({
				isFetching: false,
				isLoad: true,
				isError: false,
				data: action.data
			})
		case LOGIN_FAILURE:
			return state.merge({
				isFetching: false,
				isLoad: false,
				isError: true
			})
		default:
			return state
	}
}