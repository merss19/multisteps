import * as React from 'react'
import {connect} from 'react-redux'
import {LoginForm} from './containers/LoginForm'
import {submitLogin} from './ducks'
import {LoginFormData} from './interfaces'
import {browserHistory} from 'react-router'
import {CustomModal, toggleModal, ModalTypes} from '../CustomModal'
import Cookie from '../../tools/cookie'
import Carrot from '../../tools/carrot'
import {changeStep, Steps} from '../SignUp'
import {
	selectIsFetching,
	selectIsLoad,
	selectProfile,
	selectIsError
} from './selectors'

type ConnectedDispatch = {
	changeStep: (data: Steps) => void
	submitLogin(data: LoginFormData): void
	toggleModal(data: boolean): void

}
type ConnectedState = {
	isFetching: boolean
	isLoad: boolean
	isError: boolean
	profile: any
}
const mapStateToProps = (state: any): ConnectedState => ({
	isFetching: selectIsFetching(state),
	isLoad: selectIsLoad(state),
	isError: selectIsError(state),
	profile: selectProfile(state)
})
class ProfileLoginComponent extends React.Component<ConnectedDispatch & ConnectedState, {}> {

	onSubmit = (data: LoginFormData) => {
		this.props.submitLogin(data)
	}

	componentWillReceiveProps(nextProps: ConnectedDispatch & ConnectedState) {
		if (nextProps.isFetching !== this.props.isFetching || nextProps.isError !== this.props.isError) {
			const isOpen: boolean = nextProps.isFetching || nextProps.isError
			this.props.toggleModal(isOpen)
		}

		if (nextProps.isLoad) {
			this.resultAction(nextProps.profile)
		}
	}

	resultAction(data: any): void {
		if (data.paidState !== 0) {
			Carrot().auth(data.id, data.cqhmac)
			Cookie().save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10})
			Cookie().save(
				'userProgram', data.program, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10}
			)
			Cookie().save(
				'fullName', data.firstName + ' ' + data.lastName,
				{path: '/', maxAge: 60 * 60 * 24 * 365 * 10}
			)

			if (data.paidState === 2 && data.program % 4 !== 0) {
				this.props.changeStep(Steps.four)
			} else if (data.isFirstEdit) {
				browserHistory.push('/profile')
			} else {
				browserHistory.push('/task')
			}
		} else if (!data.program) {
			Carrot().auth(data.id, data.cqhmac)
			Cookie().save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10})
			this.props.changeStep(Steps.two)
			browserHistory.push('/signup')
		} else if (data.paidState === 0 || data.paidState === 1) {
			Carrot().auth(data.id, data.cqhmac)
			Cookie().save('token', data.authToken, {path: '/', maxAge: 60 * 60 * 24 * 365 * 10})
			this.props.changeStep(Steps.three)
			browserHistory.push('/signup')
		}
	}

	render() {
		const { isFetching, isError } = this.props
		const text: string = isError ? 'Неправильный email или пароль' : ''

		return (
			<LoginForm onSubmit={this.onSubmit}>
				<CustomModal
					modal={ModalTypes.error}
					resultText={text}
					isLoader={isFetching}
				/>
			</LoginForm>
		)
	}
}
const ProfileLogin = connect(mapStateToProps, {
	submitLogin,
	changeStep,
	toggleModal
})(ProfileLoginComponent)
export default ProfileLogin