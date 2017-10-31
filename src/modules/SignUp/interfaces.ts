import {Steps} from './const'

export interface Action {
	type: string,
	data?: {}
}
export interface Program {
	id: number,
	name: string,
	isActive?: boolean
}
export interface PackageType {
	name: string,
	isActive: boolean,
	id: number
}

export interface StepOne {
	isErrorGender: boolean,
	genderError: string
}

export interface StepTwo {
	choosenProgram: number
	choosenPackageType: number
	packages: {}
	promo: string
	promoError: string
	payment: any
}
export interface SignUpFormData {
	email: string
	password: string
	passwordAgain: string
}
export interface StateSignUp {
	step: Steps,
	isTest: boolean,
	isTele2: boolean,
	isInfoBlock: boolean,
	isFetching: boolean,
	isLoad: boolean,
	isError: boolean,
	programs: Program[],
	userProfile: any
}
export interface Payment {
	authToken: string
	data: {
		program: number
		package: number
		promoName?: string
		isShare?: boolean
	}
}
export interface StepThree {
	payment: any
}