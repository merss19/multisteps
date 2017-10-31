import * as Immutable from 'immutable'
import {Dispatch} from 'redux'
import {StepOne, Action} from '../../interfaces'
// Constant
const SET_RADIO_ERROR = 'SET_RADIO_ERROR'
const REMOVE_RADIO_ERROR = 'REMOVE_RADIO_ERROR'
// Action Creators

export const setRadioError = (data: string) => (dispatch: Dispatch<StepOne>) => {
	dispatch({
		type: SET_RADIO_ERROR,
		data
	})
}
export const removeRadioError = () => (dispatch: Dispatch<StepOne>) => {
	dispatch({
		type: REMOVE_RADIO_ERROR
	})
}
// Reducer
const initialState: StepOne = {
	isErrorGender: false,
	genderError: ''
}

const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action): StepOne => {
	switch (action.type) {
		case SET_RADIO_ERROR:
			return state.set('isErrorGender', true)
									.set('genderError', action.data)
		case REMOVE_RADIO_ERROR:
			return state.set('isErrorGender', false)
									.set('genderError', '')
		default:
			return state
	}
}