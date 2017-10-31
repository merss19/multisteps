import * as React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import PasswordForgetForm from './components/PasswordForgetForm'
import PasswordRestoreForm from './components/PasswordRestoreForm'
import {PasswordFormData, RestoreFormData} from './interfaces'
import {submitPassword, submitRestore} from './ducks'
import {CustomModal, toggleModal, ModalType, ModalTypes} from '../CustomModal'
import {
	selectIsFetching,
	selectIsLoad,
	selectIsError,
	selectResultText,
	selectErrorMessage,
	selectResultCode
} from './selectors'

type OwnProps = {
	tokenPassword?: string
}

type ConnectedDispatch = {
	submitPassword(data: PasswordFormData): void
	submitRestore(data: RestoreFormData): void
	toggleModal(isOpen: boolean): void
}
type ConnectedState = {
	isFetching: boolean
	isLoad: boolean
	isError: boolean
	resultText: string
	resultCode: number
	errorMessage: string
}
const mapStateToProps = (state: any, OwnProps: OwnProps): ConnectedState => ({
	isFetching: selectIsFetching(state),
	isLoad: selectIsLoad(state),
	isError: selectIsError(state),
	resultText: selectResultText(state),
	resultCode: selectResultCode(state),
	errorMessage: selectErrorMessage(state)
})
class ProfilePasswordForgetComponent extends React.PureComponent<ConnectedState & ConnectedDispatch & OwnProps, {}> {
	componentWillReceiveProps(nextProps: ConnectedDispatch & ConnectedState & OwnProps) {
		if (
			nextProps.isFetching !== this.props.isFetching ||
			nextProps.isError !== this.props.isError ||
			nextProps.isLoad !== this.props.isLoad) {
			const isOpen: boolean = nextProps.isFetching || nextProps.isError || nextProps.isLoad
			this.props.toggleModal(isOpen)
		}
	}

	onSubmit = (data: PasswordFormData) => {
		const {submitPassword} = this.props
		submitPassword(data)
	}

	onSubmitRestore = (data: RestoreFormData) => {
		const { submitRestore, tokenPassword } = this.props
		data.tokenPassword = tokenPassword
		submitRestore(data)
	}
	setModal() {
		const { isLoad, isError, resultCode } = this.props
		let modal: ModalType = ModalTypes.info

		if (isError) {
			 modal = ModalTypes.error
		}
		if (isLoad) {
			if (resultCode === 1) {
				modal = ModalTypes.success
			}
		}
		return modal
	}

	clickHandler() {
		const { tokenPassword } = this.props
		const  modal: ModalType = this.setModal()
		if (tokenPassword && modal === ModalTypes.success) {
			browserHistory.push('/')
		}
	}

	render() {
		const {
			isFetching,
			tokenPassword,
			isError,
			resultText,
			errorMessage
		} = this.props
		const  modal: ModalType = this.setModal()
		const text: string = isError ? errorMessage : resultText

		return (
			<div className='entry--min'>
				{!tokenPassword
					?
					<PasswordForgetForm  onSubmit={this.onSubmit}/>
					:
					<PasswordRestoreForm  onSubmit={this.onSubmitRestore}/>
				}
				<CustomModal
					modal={modal}
					resultText={text}
					clickHandler={() => this.clickHandler()}
					isLoader={isFetching}
				/>
			</div>
		)
	}
}
const ProfilePasswordForget = connect(mapStateToProps, {
	submitPassword,
	submitRestore,
	toggleModal
})(ProfilePasswordForgetComponent)

export default ProfilePasswordForget