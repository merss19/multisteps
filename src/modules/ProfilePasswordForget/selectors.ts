import {createSelector} from 'reselect'

const profilePassword = (state: any) => state.profilePassword
const isFetching = (state: any) => profilePassword(state).get('isFetching')
const isLoad = (state: any) => profilePassword(state).get('isLoad')
const isError = (state: any) => profilePassword(state).get('isError')
const resultText = (state: any) => profilePassword(state).get('data').get('resultText')
const resultCode = (state: any) => profilePassword(state).get('data').get('resultCode')
const errorMessage = (state: any) => profilePassword(state).get('data').get('errorMessage')

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

export const selectResultText = createSelector(
	resultText,
	(resultText) => {
		return resultText
	}
)
export const selectResultCode = createSelector(
	resultCode,
	(resultCode) => {
		return resultCode
	}
)
export const selectErrorMessage = createSelector(
	errorMessage,
	(errorMessage) => {
		return errorMessage
	}
)
