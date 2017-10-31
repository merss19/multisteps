import {createSelector} from 'reselect'
//import {Program} from './interfaces'

const step = (state: any) => state.registration.signUp.get('step')
const isTest = (state: any) => state.registration.signUp.get('isTest')
const isTele2 = (state: any) => state.registration.signUp.get('isTele2')
const isInfoBlock = (state: any) => state.registration.signUp.get('isInfoBlock')
const isGeneral = (state: any) => state.registration.signUp.get('isGeneral')
const genderError = (state: any) => state.registration.step1.get('genderError')
const isFetching = (state: any) => state.registration.signUp.get('isFetching')
const isLoad = (state: any) => state.registration.signUp.get('isLoad')
const isError = (state: any) => state.registration.signUp.get('isError')
const programs = (state: any) => state.registration.signUp.get('programs')
const userProfile = (state: any) => state.registration.signUp.get('userProfile')
const choosenProgram = (state: any) => state.registration.stepTwo.get('choosenProgram')

export const selectUserProfile = createSelector(
	userProfile,
	(userProfile) => userProfile
)
export const selectPrograms = createSelector(
	programs,
	choosenProgram,
	(programs, choosenProgram) => {
		programs = programs.map((program: any) => {
			if (choosenProgram == 0 ) {
				if (program.get('id') % 4 == 1) {
					return program.set('isActive', true)
				}
			}
			if (program.get('id') == choosenProgram) {
				return program.set('isActive', true)
			}
			return program
		})
		return programs.toJS()
	}
)
export const selectIsFetching = createSelector(
	isFetching,
	(isFetching) => isFetching
)
export const selectIsLoad = createSelector(
	isLoad,
	(isLoad) => isLoad
)
export const selectIsError = createSelector(
	isError,
	(isError) => isError
)
export const selectStep = createSelector(
	step,
	(step) => step
)
export const selectIsTest = createSelector(
	isTest,
	(isTest) => isTest
)

export const selectIsTele2 = createSelector(
	isTele2,
	(isTele2) => isTele2
)

export const selectIsInfoBlock = createSelector(
	isInfoBlock,
	(isInfoBlock) => isInfoBlock
)

export const selectIsGeneral = createSelector(
	isGeneral,
	(isGeneral) => isGeneral
)

export const selectGenderError =  createSelector(
	genderError,
	(genderError) => genderError
)
