import {submitDataPassword, submitDataRestore}  from './api'
import {PasswordFormData, RestoreFormData, StateProfilePassword, Action} from './interfaces'
import * as Immutable from 'immutable'
import {Dispatch} from 'redux'

// Constant
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST'
export const PASSWORD_SUCCEESS = 'PASSWORD_SUCCEESS'
export const PASSWORD_FAILURE = 'PASSWORD_FAILURE'

// Action Creators
const request = (): Action => ({
	type: PASSWORD_REQUEST,
})
const success = (data: any): Action => ({
	type: PASSWORD_SUCCEESS,
	data
})

const failure = (): Action => ({
	type: PASSWORD_FAILURE
})

export const submitRestore = (data: RestoreFormData) => (dispatch: Dispatch<StateProfilePassword>) => {
	dispatch(request())
	submitDataRestore(data)
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

export const submitPassword = (data: PasswordFormData) => (dispatch: Dispatch<StateProfilePassword>) => {
	dispatch(request())
	submitDataPassword(data)
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
const initialState: StateProfilePassword = {
	isFetching: false,
	isLoad: false,
	data: {},
	isError: false
}
const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action) => {
	switch (action.type) {
		case PASSWORD_REQUEST:
			return state.merge({
				isFetching: true,
				isError: false,
				isLoad: false
			})

		case PASSWORD_SUCCEESS:
			return state.merge({
				isFetching: false,
				isLoad: true,
				isError: false,
				data: action.data
			})
		case PASSWORD_FAILURE:
			return state.merge({
				isFetching: false,
				isLoad: false,
				isError: true
			})
		default:
			return state
	}
}