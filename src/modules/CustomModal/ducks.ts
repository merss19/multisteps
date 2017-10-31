import { StateModal, Action} from './interfaces'
import * as Immutable from 'immutable'

// Constant
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

// Action Creators
export const toggleModal = (data: boolean): Action => ({
	type: TOGGLE_MODAL,
	data
})

// Reducer
const initialState: StateModal = {
	isOpen: false
}
const initialStateImmutable = Immutable.fromJS(initialState)

export default (state = initialStateImmutable, action: Action) => {
	switch (action.type) {
		case TOGGLE_MODAL:
			return state.merge({
				isOpen: action.data
			})
		default:
			return state
	}
}