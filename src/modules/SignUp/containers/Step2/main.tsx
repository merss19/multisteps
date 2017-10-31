import * as React from 'react'
import {connect} from 'react-redux'
import {FormProps, reduxForm} from 'redux-form'
import {browserHistory} from 'react-router'
import * as classNames from 'classNames'
import {
	choosenProgramAction,
	setPackageType,
	getPackage,
	setPromo,
	paymentCreate
} from './ducks'
import {
	selectChoosenProgram,
	selectPromoError,
	selectPackageType,
	selectPackages,
	selectPromo,
	selectPackage
} from './selectors'
export {selectPackage}

import Cookie from '../../../../tools/cookie'
import {Steps} from '../../const'
import {Program} from '../../interfaces'
import {Payment} from '../../interfaces'
import {Button, ButtonTypes} from '../../../../components/Button'
import {Loader} from '../../../../components/Loader'
import {CustomModal, toggleModal, ModalTypes} from '../../../CustomModal'

interface OwnProps extends FormProps<{}, {}, {}> {
	changeStep: (data: number) => void
	programs: Program[]
	isFetching: boolean
	isLoad: boolean
}
type ConnectedState = {
	choosenProgram: number
	choosenPackageType: number
	packages: any,
	currentPackage: any
	promo: string
	promoError: string
}

type ConnectedDispatch = {
	choosenProgramAction(data: number): void
	setPackageType(data: number): void
	getPackage(data?: string): void
	paymentCreate(data: Payment, cb: () => void): void
	setPromo(data: string): void
	toggleModal(data: boolean): void
}

const mapStateToProps = (state: any): ConnectedState => ({
	choosenProgram: selectChoosenProgram(state),
	choosenPackageType: selectPackageType(state),
	packages: selectPackages(state),
	promo: selectPromo(state),
	currentPackage: selectPackage(state),
	promoError: selectPromoError(state)
})

class StepTwoComponent extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {

	promoText: any

	componentDidMount() {
		const { programs, choosenProgramAction, choosenProgram, getPackage } = this.props
		getPackage()
		if (!choosenProgram) {
			programs.map(program => {
				if (program.id % 4 === 1) {
					choosenProgramAction(program.id)
				}
			})
		}
	}

	componentWillReceiveProps(nextProps: OwnProps & ConnectedState & ConnectedDispatch) {
		const isOpen: boolean = !!nextProps.promoError
		this.props.toggleModal(isOpen)

	}

	renderProgramName() {
		const  {choosenProgram} = this.props
		let programName: string = '#Ягерой'

		if (choosenProgram % 4 == 1) {
			programName = '#Ягерой'
		}

		if (choosenProgram % 4 == 2) {
			programName = '#Мама может'
		}

		if (choosenProgram % 4 == 3) {
			programName = '#Экстрим'
		}

		if (choosenProgram % 4 == 0) {
			programName = '#Завтра'
		}
		return programName
	}

	getPromo() {
		const { getPackage, setPromo } = this.props
		if (!this.promoText.value.length) {
			return
		}
		getPackage(this.promoText.value)
		setPromo(this.promoText.value)
	}

	paymentCreate() {
		const { choosenProgram, choosenPackageType, paymentCreate, promo } = this.props
		let payload: Payment = {
			authToken: Cookie().load('token'),
			data: {
				program: choosenProgram,
				package: choosenPackageType,
			}
		}

		if (promo.length) {
			payload.data.promoName = promo
		}
		paymentCreate(payload, () => this.resultAction())
	}

	resultAction() {
		const { changeStep, choosenProgram } = this.props
		Cookie().save('program', choosenProgram,
		{ path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
		changeStep(Steps.three)
	}

	renderPrograms() {
		const  {programs, choosenProgramAction} = this.props
		return (
			programs.map((program) => (
				<li key={program.id}
						onClick = {() => choosenProgramAction(program.id)}
						className={classNames('options__item', {
							'is-active': program.isActive,
							'g-hero': program.id % 4 == 1,
							'g-mather': program.id % 4 == 2,
							'g-extreme': program.id % 4 == 3,
							'g-tomorrow': program.id % 4 == 0,
						})}
				>
					{program.name}
				</li>
			))
		)
	}

	renderPackages() {
		const  {packages, setPackageType} = this.props
		if (!packages) {
			return null
		}
		return (
			packages.map((pt: any) => {
				return (
					<li
						key={pt.id}
						className={classNames('options__item', {
							'is-active': pt.isActive,
						})}
						onClick = {() => setPackageType(pt.id)}
					>
						{pt.name}
					</li>)
			})
		)
	}

	logOut(e: any) {
			e.preventDefault()
			Cookie().remove('token', { path: '/' })
			Cookie().remove('abtest', { path: '/' })
			Cookie().remove('txId', { path: '/' })
			Cookie().remove('role', { path: '/' })
			Cookie().remove('program', { path: '/' })
			Cookie().remove('packageType', { path: '/' })
			Cookie().remove('promoName', { path: '/' })
			browserHistory.push('/')
			this.props.changeStep(Steps.one)

	}

	render() {
		const {
			choosenProgram,
			promoError,
			isFetching,
			currentPackage
		} = this.props

		if (this.props.isFetching) {
			return <Loader/>
		}

		return (
			<div>
				<div className={classNames('entry__header entry__header--colorful', {
					'g-hero': choosenProgram % 4 == 1 || choosenProgram == 0,
					'g-mather': choosenProgram % 4 == 2,
					'g-extreme': choosenProgram % 4 == 3,
					'g-tomorrow': choosenProgram % 4 == 0 && choosenProgram != 0,
				})}>
					<h2 className='entry__title text-center'>
						{this.renderProgramName()}
					</h2>

				</div>
				<div className='entry__box'>
					<ul className='options options--white wide mb30'>
						{this.renderPrograms()}
					</ul>
					<ul className='options options--white options--types wide mt30'>
						{this.renderPackages()}
					</ul>
				</div>
				<div className='entry__box'>
					<div className='entry-program-price'>{currentPackage ? currentPackage.cost : ''} руб</div>
					<div className='input--btn'>
						<input
							ref = {input => this.promoText = input}
							type='text'
							className='input__field'
							placeholder='Eсть промокод, вводи'
						/>
						<Button
							onClick={() => this.getPromo()}
							type='button'
							styleBtn={ButtonTypes.info}
						>
							Применить
						</Button>
					</div>
					<Button
						onClick={() => this.paymentCreate()}
						type='button'
						styleBtn={ButtonTypes.success}
						wide={true}
					>
						Далее
					</Button>
				</div>

				<div className='entry__link text-center'>
					<div className='entry-nav__item'>
						<a href='#' onClick={e => this.logOut(e)}>Выйти</a>
					</div>
				</div>
				<CustomModal
					modal={ModalTypes.error}
					resultText={promoError}
					isLoader={isFetching}
				/>
			</div>)
	}
}
const StepTwo = connect(
	mapStateToProps, {
		choosenProgramAction,
		setPackageType,
		toggleModal,
		paymentCreate,
		setPromo,
		getPackage
	})
(StepTwoComponent)

export default reduxForm({
	form: 'SignUpProgram'
})(StepTwo)
