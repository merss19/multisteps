import * as Immutable from 'immutable'
import {fetchPaymentInfo, fetchPaymentManual} from './api'
import {Dispatch} from 'redux'
import {StepThree, Action} from '../../interfaces'
// Constant

const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS'

import {
	request,
	success,
	failure
} from '../../ducks'
// Action Creators

export const paymentManual = (data: string, cb: any) => (dispatch: Dispatch<StepThree>) => {
	dispatch(request())
	fetchPaymentManual(data)
		.then(response => response.json())
		.then(res => {
			if (res.data && res.errorCode === 1) {
				dispatch(success())
				cb(res.data)
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}
export const paymentInfo = () => (dispatch: Dispatch<StepThree>) => {
	dispatch(request())
	fetchPaymentInfo()
		.then(response => response.json())
		.then(res => {
			if (res.data && res.errorCode === 1) {
				dispatch(success())
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}

// Reducer
const initialState: StepThree = {
	payment: {}
}

const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action): StepThree => {
	switch (action.type) {
		case PAYMENT_SUCCESS:
			return state.set('payment', action.data)
		default:
			return state
	}
}