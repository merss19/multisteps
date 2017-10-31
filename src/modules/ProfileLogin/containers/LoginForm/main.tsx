import * as React from 'react'
import {Field, FormProps, reduxForm} from 'redux-form'
import {Link, browserHistory} from 'react-router'
import InputText from '../../../../components/InputText'
import {Button, ButtonTypes} from '../../../../components/Button'
import {host} from '../../../../config'
import Cookie from '../../../../tools/cookie'
import {fetchAuthenticateFb} from './api'

interface LoginFormData {
	email: string
	password: string
}

interface OwnProps extends FormProps<LoginFormData, {}, {}> {
	onSubmit: (values: LoginFormData) => void
}

class LoginForm extends React.Component<OwnProps, {}> {

	loginVk = () => {
		window.location.href = `https://oauth.vk.com/authorize?client_id=5960742&scope=
		wall,offline&redirect_uri=${host}/social/vk&display=page&response_type=code`
	}

	loginOk = () => {
		const urlOk = `https://connect.ok.ru/oauth/authorize?client_id=
		1248995328&scope=VALUABLE_ACCESS,LONG_ACCESS_TOKEN,PHOTO_CONTENT,
		GET_EMAIL&response_type=code&redirect_uri=${host}/social/ok`
		window.open(urlOk, 'Odnoklassniki', 'width=700,height=400')
	}

	redirectFb = () => {
		let uri = encodeURI(`${host}/social/fb`)
		window.location.href = encodeURI('https://www.facebook.com/dialog/' +
			'oauth?client_id=602675109923486&redirect_uri=' + uri + '&response_type=token')
	}

	loginFb = () => {
		const FB = window.FB
		FB.getLoginStatus((response: any) => {
			if (response.status === 'connected') {
				const token = response.authResponse.accessToken
				const userId = response.authResponse.userID
				const payload = { userId, token }
				fetchAuthenticateFb(payload)
					.then(response => response.json())
					.then(json => {
						if (json.errorCode === 1 && json.data && json.data.authToken) {
							Cookie().save('token', json.data.authToken, { path: '/', maxAge: 60 * 60 * 24 * 365 * 10 })
							browserHistory.push('/signup')
						} else {
							this.redirectFb()
						}
					})
			} else {
				return this.redirectFb()
			}
		}, { scope: 'email' })
	}

	render() {
		const {onSubmit, handleSubmit} = this.props
		return (
			<div className='entry entry--min'>
				<div className='entry__inner'>

					<div className='entry__header'>
						<h2 className='entry__title text-center'>Вход в Личный кабинет</h2>
					</div>

					<form onSubmit={handleSubmit!(onSubmit)} className='entry__box'>
						<Field name='email'
									 placeholder='Ваш e-mail'
									 type='email'
									 component={InputText}
						/>
						<Field name='password'
									 placeholder='Ваш пароль'
									 type='password'
									 component={InputText}
						/>

						<Button
							type='submit'
							styleBtn={ButtonTypes.info}
							wide={true}
						>
							Войти
						</Button>

						<ul className='entry-nav mtb20'>
							<li className='entry-nav__item'>
								<Link to='/signup'>Регистрация</Link>
							</li>
							<li className='entry-nav__item'>
								<Link to='/restore'>Забыли пароль?</Link>
							</li>
						</ul>

						<div>
							<p className='text-center mb10'>Войти через социальные сети</p>
							<ul className='social-signin'>
								<li
									className='social-signin__item social-signin__item--fb'
									onClick={this.loginFb}
								>
									<svg className='svg-icon svg-icon--fb'>
										<use xlinkHref='#fb' />
									</svg>
								</li>
								<li
									className='social-signin__item social-signin__item--vk'
									onClick={this.loginVk}
								>
									<svg className='svg-icon svg-icon--vk'>
										<use xlinkHref='#vk' />
									</svg>
								</li>
								<li
									className='social-signin__item social-signin__item--odnoklassniki'
									onClick={this.loginOk}
								>
									<svg className='svg-icon svg-icon--ok'>
										<use xlinkHref='#odnoklassniki' />
									</svg>
								</li>
							</ul>
						</div>

					</form>
					{this.props.children}
				</div>
			</div>
		)
	}
}

const validate = (data: any) => {
	const errors: any = {}

	if (!data.email) {
		errors.email = 'Email должен быть заполнен'
	}
	if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(data.email)) {
		errors.email = 'Email заполнен неправильно'
	}
	if (!data.password) {
		errors.password = 'Поле пароля должно быть заполнено'
	}
	return errors
}

export default reduxForm({
	form: 'LoginFormm',
	validate
})(LoginForm)
