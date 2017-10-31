import {createSelector} from 'reselect'

const programs = (state: any) => state.registration.signUp.get('programs')
const choosenProgram = (state: any) => state.registration.stepTwo.get('choosenProgram')
const choosenPackageType = (state: any) => state.registration.stepTwo.get('choosenPackageType')
const packages = (state: any) => state.registration.stepTwo.get('packages')
const promo = (state: any) => state.registration.stepTwo.get('promo')
const promoError = (state: any) => state.registration.stepTwo.get('promoError')

export const selectPromoError = createSelector(
	promoError,
	(promoError) => promoError
)
export const selectPromo = createSelector(
	promo,
	(promo) => promo
)
export const selectPrograms = createSelector(
	programs,
	choosenProgram,
	(programs, choosenProgram) => {
		programs = programs.map((program: any) => {
			if (program.get('id') % 4 == 1) {
				return program.set('isActive', true)
			}
			if (program.get('id') == choosenProgram) {
				return program.set('isActive', true)
			}
			return program
		})
		return programs.toJS()
	}
)

export const selectPackages = createSelector(
	packages,
	choosenPackageType,
	(packages, choosenPackageType) => {
		if (!packages.toJS().length) {
			return null
		}
		packages = packages.map((pt: any) => {
			if (pt.get('id') == choosenPackageType) {
				return pt.set('isActive', true)
			}
			return pt
		})
		return packages.toJS()
	}
)

export const selectChoosenProgram = createSelector(
	choosenProgram,
	(choosenProgram) => choosenProgram
)
export const selectPackage = createSelector(
	choosenPackageType,
	packages,
	(choosenPackageType, packages) => {
		let packageItem
		packages.forEach((item: any) => {
			if (item.get('id') == choosenPackageType) {
				packageItem = item.toJS()
			}
		})
		return packageItem
	}
)
export const selectPackageType = createSelector(
	choosenPackageType,
	(choosenPackageType) => choosenPackageType
)
