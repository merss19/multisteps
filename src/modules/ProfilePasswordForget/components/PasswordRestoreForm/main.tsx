import * as React from 'react'
import {Field, reduxForm, FormProps} from 'redux-form'
import {Link} from 'react-router'
import {RestoreFormData} from '../../interfaces'
import {Button, ButtonTypes} from '../../../../components/Button'
import InputText from '../../../../components/InputText'

interface OwnProps extends FormProps<RestoreFormData, {}, {}> {
	onSubmit: (values: RestoreFormData) => void
}

class PasswordRestoreForm extends React.PureComponent<OwnProps, {}> {

	render() {
		const { handleSubmit, onSubmit} = this.props
		return (
			<div className='entry__inner'>
				<div className='entry__header'>
					<h2 className='entry__title text-center'>Восстановление пароля</h2>
				</div>
				<form onSubmit={handleSubmit!(onSubmit)} className='entry__box'>
					<Field name='pass' id='pass' placeholder='Новый пароль' component={InputText} />
					<Field name='passAgain' id='passAgain' placeholder='Новый пароль повторно' component={InputText} />

					<Button
						styleBtn={ButtonTypes.info}
						type='submit'
						wide={true}
					>
						Восстановить пароль
					</Button>
					<ul className='entry__link text-center'>
						<li className='entry-nav__item'>
							<Link to='/signup'>Регистрация</Link>
						</li>
					</ul>
				</form>
			</div>
		)
	}
}
const validate = (data: any) => {
	const errors: any = {}

	switch (true) {
		case !data.pass:
			errors.pass = 'Поле пароля должно быть заполнено'
			break
		case data.pass.length < 6:
			errors.pass = 'Поле пароля должно быть длиннее 6 символов'
			break
		case data.pass.length > 20:
			errors.pass = 'Поле пароля должно быть короче 20 символов'
			break
		case /["]/g.test(data.pass):
			errors.pass = 'Поле пароля не должно содержать знак "'
			break
		default:
			break
	}

	if (data.pass !== data.passAgain) {
		errors.passAgain = 'Пароли должны совпадать'
	}

	return errors
}

export default reduxForm({
	form: 'RestoreForm',
	validate
})(PasswordRestoreForm)