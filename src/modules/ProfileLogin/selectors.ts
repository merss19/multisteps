import {createSelector} from 'reselect'

const profileLogin = (state: any) => state.profileLogin
const isFetching = (state: any) => profileLogin(state).get('isFetching')
const isLoad = (state: any) => profileLogin(state).get('isLoad')
const isError = (state: any) => profileLogin(state).get('isError')
const profile = (state: any) => profileLogin(state).get('profile')

export const selectProfile = createSelector(
	profile,
	(profile) => {
		return profile
	}
)
export const selectIsFetching = createSelector(
	isFetching,
	(isFetching) => {
		return isFetching
	}
)
export const selectIsLoad = createSelector(
	isLoad,
	(isLoad) => {
		return isLoad
	}
)
export const selectIsError = createSelector(
	isError,
	(isError) => {
		return isError
	}
)
