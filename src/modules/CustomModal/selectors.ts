import {createSelector} from 'reselect'

const isOpen = (state: any) => state.modal.get('isOpen')

export const selectIsOpen = createSelector(
	isOpen,
	(isOpen) => {
		return isOpen
	}
)
