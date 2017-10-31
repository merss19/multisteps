import * as React from 'react'
import {browserHistory} from 'react-router'
import Cookie from '../../../../tools/cookie'

import {Button, ButtonTypes} from '../../../../components/Button'
import {Loader} from '../../../../components/Loader'

interface OwnProps {
	isFetching: boolean
}

class StepFour extends React.Component<OwnProps, {}> {

	logOut() {
		Cookie().remove('token', { path: '/' })
		Cookie().remove('txId', { path: '/' })
		Cookie().remove('role', { path: '/' })
		Cookie().remove('program', { path: '/' })
		Cookie().remove('packageType', { path: '/' })
		browserHistory.push('/')
	}

	render() {

		if (this.props.isFetching) {
			return <Loader/>
		}
		return (
			<div className='entry__success'>
				<h3>Ваша заявка принята.</h3>
				<p>В ближайшее время мы с вами свяжемся!</p>
				<div className='text-center pt20'>
					<Button
						onClick={() => this.logOut()}
						type={'button'}
						styleBtn={ButtonTypes.info}
					>
						Вернуться на главный сайт
					</Button>
				</div>
			</div>)
	}
}

export default StepFour
