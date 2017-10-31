import * as Immutable from 'immutable'
import {combineReducers, Dispatch} from 'redux'
import {fetchProgramsData, fetchUserCreate} from './api'
import {Action, StateSignUp, SignUpFormData, Program} from './interfaces'
import {Steps} from './const'
import {step1Reducer} from './containers/Step1'
import {stepTwoReducer} from './containers/Step2'
import {stepThreeReducer} from './containers/Step3'

// Constant
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

const GET_PROGRAMS = 'GET_PROGRAMS'
const GET_USER_PROFILE = 'GET_USER_PROFILE'
const CHANGE_STEP = 'CHANGE_STEP'

// Action Creators
export const request = (): Action => ({
	type: SIGNUP_REQUEST,
})

export const success = (): Action => ({
	type: SIGNUP_SUCCESS
})
export const failure = (): Action => ({
	type: SIGNUP_FAILURE,
})

const getPrograms = (data: Program): Action => ({
	type: GET_PROGRAMS,
	data
})
const getUserProfile = (data: any): Action => ({
	type: GET_USER_PROFILE,
	data
})

export const fetchPrograms = () => (dispatch: Dispatch<StateSignUp>) => {
	dispatch(request())
	fetchProgramsData()
		.then(response => response.json())
		.then(res => {
			if (res.errorCode === 1) {
				let programs = res.data
				programs = programs.map((program: any) => {
					return {
						...program,
						isActive: false
					}
				})
				dispatch(success())
				dispatch(getPrograms(programs))
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}

export const userCreate = (data: SignUpFormData, cb: any) => (dispatch: Dispatch<StateSignUp>) => {
	dispatch(request())
	fetchUserCreate(data)
		.then(response => response.json())
		.then(res => {
			const data = res.data
			if (data && res.errorCode === 1) {
				dispatch(success())
				dispatch(getUserProfile(data))
				cb(data)
			} else {
				dispatch(failure())
			}
		})
		.catch((err) => {
			throw new Error(err.message)
		})
}
export const changeStep = (data: Steps) => (dispatch: Dispatch<StateSignUp>) => (
	dispatch({
		type: CHANGE_STEP,
		data
}))

// Reducer
const initialState: StateSignUp = {
	step: Steps.one,
	isTest: false,
	isTele2: false,
	isInfoBlock: false,
	isFetching: false,
	isLoad: false,
	isError: false,
	programs: [],
	userProfile: {}
}

const initialStateImmutable = Immutable.fromJS(initialState)

const signUpReducer = (state = initialStateImmutable, action: Action): StateSignUp => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return state.merge({
				isFetching: true,
				isLoad: false,
				isError: false,
			})
		case SIGNUP_SUCCESS:
			return state.merge({
				isFetching: false,
				isLoad: true,
				isError: false
			})
		case GET_PROGRAMS:
			return state.merge({
				programs: action.data
			})
		case GET_USER_PROFILE:
			return state.merge({
				userProfile: action.data
			})
		case SIGNUP_FAILURE:
			return state.merge({
				isFetching: false,
				isLoad: false,
				isError: true,
			})
		case CHANGE_STEP:
			return state.set('step', action.data)

		default:
			return state
	}
}

const  registrationReducer = combineReducers({
	step1: step1Reducer,
	signUp: signUpReducer,
	stepTwo: stepTwoReducer,
	stepThree: stepThreeReducer
})

export default registrationReducer