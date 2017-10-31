import {createSelector} from 'reselect'

const genderError = (state: any) => state.registration.step1.get('genderError')

export const selectGenderError =  createSelector(
	genderError,
	(genderError) => genderError
)
