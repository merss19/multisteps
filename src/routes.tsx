import * as React from 'react'
import {Route, IndexRoute, browserHistory} from 'react-router'
import ProfileLogin from './pages/PageProfileLogin'
import PagePasswordForget from './pages/PagePasswordForget'
import PagePasswordRestore from './pages/PagePasswordRestore'
import TodayTask from './pages/PageTodayTask'
import PageSignUp from './pages/PageSignUp'
import Cookie from './tools/cookie'
import {api} from './config'

const leave = () => {
	Cookie().remove('token', { path: '/' })
	Cookie().remove('txId', { path: '/' })
	Cookie().remove('role', { path: '/' })
	Cookie().remove('program', { path: '/' })
	Cookie().remove('packageType', { path: '/' })
	Cookie().remove('promoName', { path: '/' })
	Cookie().remove('share', { path: '/' })
	browserHistory.push('/')
}

const requirePayAuth = () => {
	const token = Cookie().load('token')
		if (!token) {
			return
		}

	return fetch(`${api}/user/user-get`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				authToken: token,
				data: {}
			})
		})
		.then(response => response.json())
		.then(json => {
			if (json && json.errorCode === 1 && json.data && json.data[0]) {
				if (json.data[0].paidState !== 0 && json.data[0].program % 4 !== 0 ) {
					Cookie().save('userProgram', json.data[0].program,
						{path: '/', maxAge: 60 * 60 * 24 * 365 * 10})
					if (json.data[0].paidState === 2) {
						browserHistory.push('/signup')
					} else if (json.data[0].isFirstEdit) {
						browserHistory.push('/task')
					} else {
						browserHistory.push('/profile')
					}
				}
			} else {
				leave()
			}
		})
}

export default (store: any) => {
	return (
		<Route path='/' onEnter={requirePayAuth}>
			<IndexRoute component={ProfileLogin}/>
			<Route path='task' component={TodayTask}/>
			<Route path='signup' component={PageSignUp}>
				<Route path=':program' />
			</Route>

			<Route path='restore'>
				<IndexRoute component={PagePasswordForget} />
				<Route path='create' component={PagePasswordRestore} />
			</Route>
		</Route>
	)
}
