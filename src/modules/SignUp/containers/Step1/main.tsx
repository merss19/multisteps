import * as React from 'react'
import {connect} from 'react-redux'
import {Field, FormProps, reduxForm} from 'redux-form'
import {Link, browserHistory} from 'react-router'

import * as classNames from 'classNames'

import {setRadioError, removeRadioError} from './ducks'
import {asyncValidate} from './api'
import InputText from '../../../../components/InputText'
import RadioInput from '../../../../components/RadioInput'
import CheckboxInput from '../../../../components/CheckboxInput'
import {SignUpFormData} from '../../interfaces'
import {Button, ButtonTypes} from '../../../../components/Button'
import Cookie from '../../../../tools/cookie'
import {Steps} from '../../const'
import {selectGenderError} from './selectors'
import {Loader} from '../../../../components/Loader'

interface OwnProps extends FormProps<{}, {}, {}> {
	changeStep: (data: number) => void
	isFetching: boolean
	programName: string
}
type ConnectedState = {
	genderError: string
}
type ConnectedDispatch = {
	test?: string
	setRadioError: (data: string) => void
	removeRadioError: () => void
	userCreate(data: SignUpFormData, cb: (data: any) => void): void
}

const mapStateToProps = (state: any): ConnectedState => {
	return {
		genderError: selectGenderError(state)
}}

class StepOneComponent extends React.Component<OwnProps & ConnectedDispatch & ConnectedState, {}> {
	onSubmit = (data: SignUpFormData) => {
		this.props.userCreate(data, (data) => this.resultAction(data))
	}

	resultAction(data: any): void {
		if (data && data.authToken) {
			Cookie().save('token', data.authToken,
			{ path: '/', maxAge: 60 * 60 * 24 * 365 * 10})
			this.props.changeStep(Steps.two)
		}
	}
	renderHeader() {
		const {programName} = this.props
		return(
			<div className={classNames('entry__header', {
				'entry__header--colorful mrl80 g-hero': programName === 'hero',
				'entry__header--colorful mrl80 g-mather': programName === 'mother',
				'entry__header--colorful mrl80 g-extreme': programName === 'extreme',
				'entry__header--colorful mrl80 g-tomorrow': programName === 'tomorrow',
			})}>
				<h2 className='entry__title entry__title--auth text-center '>
					Регистрация
				</h2>
			</div>
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
		const {handleSubmit, setRadioError, removeRadioError, genderError} = this.props
		if (this.props.isFetching) {
			return <Loader/>
		}
		return (
			<form className='entry__box' onSubmit={handleSubmit!(this.onSubmit)}>
				{this.renderHeader()}
				<Field
					name='email'
					placeholder='Ваш e-mail'
					type='text'
					component={InputText}
				/>
				<Field
					name='password'
					placeholder='Ваш пароль'
					type='password'
					component={InputText}
				/>
				<Field
					name='passwordAgain'
					placeholder='Пароль повторно'
					type='password'
					component={InputText}
				/>

				<div className='gender'>
					<div className='gender__group'>
						<p className='gender__title'>Ваш пол:</p>
						<Field
							name='gender'
							id='male'
							value='male'
							type='radio'
							title='Мужчина'
							setRadioError={setRadioError}
							removeRadioError={removeRadioError}
							component={RadioInput}
						/>
						<Field
							name='gender'
							id='female'
							value='female'
							type='radio'
							title='Женщина'
							setRadioError={setRadioError}
							removeRadioError={removeRadioError}
							component={RadioInput}
						/>
					</div>
					<div className='gender__error'>{genderError}</div>
					<hr className='gender__hr'/>
				</div>

				<div className='checkboxes'>
					<Field
						name='accept'
						title='Принять условия '
						id='accept'
						component={CheckboxInput} />
				</div>

				<Button
					type='submit'
					styleBtn={ButtonTypes.info}
					wide= {true}
				>
					Зарегистрироваться
				</Button>

				<div className='entry__link text-center mtb20'>
					<div className='entry-nav__item'>
						<Link to='/'>Войти</Link>
					</div>
					<div className='entry-nav__item'>
						<Link to='/restore'>Забыли пароль?</Link>
					</div>
				</div>
			</form>
		)
	}
}
const validate = (data: any) => {
	const errors: any = {}
	if (data.email) {
		data.email = data.email.replace(/ /g, '')
	}

	if (!data.email) {
		errors.email = 'Email должен быть заполнен'
	}
	if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email)) {
		errors.email = 'Email заполнен неправильно'
	}

	if (!data.password) {
		errors.password = 'Поле пароля должно быть заполнено'
	}
	if (data.password && data.password.length < 6) {
		errors.password = 'Поле пароля должно быть длиннее 6 символов'
	}
	if (data.password && data.password.length > 20) {
		errors.password = 'Поле пароля должно быть короче 20 символов'
	}
	if (/["]/g.test(data.password)) {
		errors.password = 'Поле пароля не должно содержать знак "'
	}

	if (data.password !== data.passwordAgain) {
		errors.passwordAgain = 'Пароли должны совпадать'
	}

	if (!data.gender) {
		errors.gender = 'Пол должен быть заполнен'
	}

	if (!data.accept) {
		errors.accept = 'Вы должны принять условия оферты и правил'
	}
	return errors
}

const StepOne = connect(mapStateToProps, {
	setRadioError,
	removeRadioError
})(StepOneComponent)

export default reduxForm({
	form: 'StepOne',
	validate,
	asyncValidate,
	asyncBlurFields: [ 'email' ]
})(StepOne)