import {createSelector} from 'reselect'

const programs = (state: any) => state.registration.signUp.get('programs')
const choosenProgram = (state: any) => state.registration.stepTwo.get('choosenProgram')
const payment = (state: any) => state.registration.stepTwo.get('payment')

export const selectProgram = createSelector(
	programs,
	choosenProgram,
	(programs, choosenProgram) => {
		let program
		programs = programs.forEach((p: any) => {
			if (p.get('id') == choosenProgram) {
				program = p.toJS()
			}
		})
		return program
	}
)
export const selectChoosenProgram = createSelector(
	choosenProgram,
	(choosenProgram) => choosenProgram
)
export const selectPayment = createSelector(
	payment,
	(payment) => payment.toJS()
)