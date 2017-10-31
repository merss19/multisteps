export interface PasswordFormData {
	email: string
}
export interface RestoreFormData {
	pass: string
	passAgain: string
	tokenPassword?: string
}
export interface Action {
	type: string,
	data?: {}
}
export interface StateProfilePassword {
	isFetching: boolean,
	isLoad: boolean,
	data: any,
	isError: boolean,
}