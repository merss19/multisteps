export interface LoginFormData {
	email: string,
	password: string
}

export interface StateProfileLogin {
	isFetching: boolean,
	isLoad: boolean,
	profile: object,
	isError: boolean,
}

export interface Action {
	type: string,
	data?: {}
}

export interface AuthenticateFb {
	token: string
	userId: string
}