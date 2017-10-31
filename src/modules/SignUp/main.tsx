import * as React from 'react'
import {connect} from 'react-redux'
import * as classNames from 'classNames'
import {fetchPrograms, changeStep, userCreate} from './ducks'
import LogoLink from '../../components/LogoLink'
import Background from '../../components/Background'
import {StepOne} from './containers/Step1'
import {StepTwo} from './containers/Step2'
import {StepThree} from './containers/Step3'
import {StepFour} from './containers/Step4'
import {Steps} from './const'
import {
	selectIsTele2,
	selectIsInfoBlock,
	selectIsFetching,
	selectPrograms,
	selectUserProfile,
	selectIsLoad,
	selectIsError,
	selectStep
} from './selectors'

interface SignUpFormData {
	email: string
	password: string
	passwordAgain: string
}
interface OwnProps {
	programName?: string
}
type ConnectedState = {
	step: Steps
	isTele2: boolean
	isFetching: boolean
	isLoad: boolean
	isError: boolean
	isInfoBlock: boolean
	programs: any
	userProfile: any
}

type ConnectedDispatch = {
	fetchPrograms: () => void
	changeStep: (data: Steps) => void
	userCreate(data: SignUpFormData, cb: () => void): void
}

const mapStateToProps = (state: any, ownProps: OwnProps): ConnectedState => ({
	step: selectStep(state),
	isTele2: selectIsTele2(state),
	isFetching: selectIsFetching(state),
	isLoad: selectIsLoad(state),
	isError: selectIsError(state),
	isInfoBlock: selectIsInfoBlock(state),
	programs: selectPrograms(state),
	userProfile: selectUserProfile(state)
})

class SignUpComponent extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {

	componentDidMount() {
		const {fetchPrograms} = this.props
		fetchPrograms()
	}

	renderContent(): any {
		const {step, ...props} = this.props

		switch (step) {
			case Steps.one:
				return <StepOne {...props}/>
			case Steps.two:
				return <StepTwo {...props}/>
			case Steps.three:
				return <StepThree {...props}/>
			case Steps.four:
				return <StepFour {...props}/>
			default:
				return <StepOne />
		}
	}

	renderHeader() {
		const {programName} = this.props
		return(
			<div className={classNames('entry__header', {
						 'entry__header--colorful g-hero': programName === 'hero',
						 'entry__header--colorful g-mather': programName === 'mother',
						 'entry__header--colorful g-extreme': programName === 'extreme',
						 'entry__header--colorful g-tomorrow': programName === 'tomorrow',
					 })}>
				<h2 className='entry__title entry__title--auth text-center '>
					Регистрация
				</h2>
			</div>
		)
	}

	render() {
		const {step} = this.props

		return (
			<div className='layout layout--entry'>
				<div className='grid entry-header'>
					<div className='1/4--desk grid__cell todayme-logo'>
						<LogoLink />
					</div>
					<div className='2/4--desk grid__cell text-center'>
						<div className='entry-step'>
							<span className='entry-step__title'>Шаг</span>
							<span className='entry-step__no'>#{step}</span>
							<span className='entry-step__go-to'>из 4</span>
						</div>
					</div>
				</div>

				<div className='entry entry--min'>
					<div className='entry__inner'>
						{this.renderContent()}
					</div>
				</div>

				<Background />
			</div>

		)
	}
}
const SignUp = connect(
	mapStateToProps,
	{fetchPrograms, changeStep, userCreate}
)(SignUpComponent)
export default SignUp