import * as Immutable from 'immutable'
import {Dispatch} from 'redux'
import { fetchGetPromo, fetchPaymentCreate } from './api'
import { Action, StepTwo, Payment } from '../../interfaces'
import {
	request,
	success,
	failure
} from '../../ducks'
// Constant
const CHOOSEN_PROGRAM = 'CHOOSEN_PROGRAM'
const SET_PACKAGE_TYPE = 'SET_PACKAGE_TYPE'
const SET_PROMO = 'SET_PROMO'

const GET_PACKAGES = 'GET_PACKAGES'
const GET_PAYMENT = 'GET_PAYMENT'
const PROMO_ERROR = 'PROMO_ERROR'
// Action Creators

const getPackages = (data: any): Action => ({
	type: GET_PACKAGES,
	data
})
export const setPromo = (data: string): Action => ({
	type: SET_PROMO,
	data
})

const getPayment = (data: any): Action => ({
	type: GET_PAYMENT,
	data
})
const promoError = (data: string): Action => ({
	type: PROMO_ERROR,
	data
})

export const choosenProgramAction = (data: number) => (dispatch: Dispatch<StepTwo>) => {
	dispatch({
		type: CHOOSEN_PROGRAM,
		data
	})
}
export const setPackageType = (data: number) => (dispatch: Dispatch<StepTwo>) => {
	dispatch({
		type: SET_PACKAGE_TYPE,
		data
	})
}

export const paymentCreate = (data: Payment, cb: any) => (dispatch: Dispatch<StepTwo>) => {
	dispatch(request())
	fetchPaymentCreate(data)
		.then(response => response.json())
		.then(res => {
			if (res.data && res.errorCode === 1) {
				dispatch(success())
				dispatch(getPayment(res.data))
				cb()
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}
export const getPackage = (data?: string) => (dispatch: Dispatch<StepTwo>) => {
	dispatch(request())
	fetchGetPromo(data)
		.then(response => response.json())
		.then(res => {
			if (res.data && res.errorCode === 1) {
				let packages = res.data
				packages = packages.map((item: any) => {
					return {
						...item,
						isActive: false
					}
				})
				dispatch(success())
				dispatch(getPackages(packages))
			} else if (res.errorCode === 3) {
				dispatch(success())
				dispatch(promoError(res.errorMessage))
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}
// Reducer
const initialState: StepTwo = {
	choosenProgram: 0,
	choosenPackageType: 1,
	packages: [],
	promo: '',
	promoError: '',
	payment: {}
}

const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action) => {
	switch (action.type) {
		case CHOOSEN_PROGRAM:
			return state.set('choosenProgram', action.data)
		case SET_PACKAGE_TYPE:
			return state.set('choosenPackageType', action.data)
		case GET_PAYMENT:
			return state.merge({
				payment: action.data
			})
		case GET_PACKAGES:
			return state.merge({
				packages: action.data,
				promoError: '',
			})
		case SET_PROMO:
			return state.merge({
				promo: action.data
			})
		case PROMO_ERROR:
			return state.merge({
				promoError: action.data
			})

		default:
			return state
	}
}