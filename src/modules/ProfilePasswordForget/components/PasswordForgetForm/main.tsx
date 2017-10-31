import * as React from 'react'
import {Field, reduxForm, FormProps} from 'redux-form'
import {Link} from 'react-router'
import {PasswordFormData} from '../../interfaces'
import {Button, ButtonTypes} from '../../../../components/Button'
import InputText from '../../../../components/InputText'

interface OwnProps extends FormProps<PasswordFormData, {}, {}> {
	onSubmit: (values: PasswordFormData) => void
}

class PasswordForgetForm extends React.PureComponent<OwnProps, {}> {

	render() {
		const { handleSubmit, onSubmit} = this.props
		return (
			<div className='entry__inner'>
				<div className='entry__header'>
					<h2 className='entry__title text-center'>Восстановление пароля</h2>
				</div>
				<form onSubmit={handleSubmit!(onSubmit)} className='entry__box'>
					<Field
						name='email'
						id='email'
						placeholder='Ваш email'
						component={InputText}
					/>
					<Button
						styleBtn={ButtonTypes.success}
						type='submit'
						wide={true}
					>
						Восстановить пароль
					</Button>
					<ul className='entry__link text-center'>
						<li className='entry-nav__item'>
							<Link to='/'>Вход в кабинет</Link>
						</li>
					</ul>
				</form>
			</div>
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
		errors.email = 'Email заполнен неправильно, проверьте его еще раз'
	}

	return errors
}

export default reduxForm({
	form: 'PasswordForm',
	validate
})(PasswordForgetForm)