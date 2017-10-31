import { ModalTypes } from './const'

export interface PasswordFormData {
	email: string
}
export type ModalType = ModalTypes.success | ModalTypes.error | ModalTypes.info | ModalTypes.loading

export interface Action {
	type: string,
	data?: {}
}
export interface StateModal {
	isOpen: boolean
}

