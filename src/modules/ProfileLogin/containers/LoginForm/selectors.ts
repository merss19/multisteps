import {createSelector} from 'reselect'

const isError = (state:any) => state.profileLogin.get('isError')

export const selectIsError = createSelector(
	isError,
	(isError) => {
		return isError
	}
)