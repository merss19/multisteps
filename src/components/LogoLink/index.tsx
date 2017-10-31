import * as React from 'react'
import {browserHistory} from 'react-router'
import Cookie from '../../tools/cookie'

const LogoLink: React.SFC<{}> = () => (
	<svg className='svg-icon ys-logo-web'
		 onClick={() => {
			 Cookie().remove('token', {path: '/'})
			 Cookie().remove('txId', {path: '/'})
			 Cookie().remove('role', {path: '/'})
			 Cookie().remove('program', {path: '/'})
			 Cookie().remove('packageType', {path: '/'})
			 Cookie().remove('promoName', {path: '/'})
			 browserHistory.push('/')
		 }}>
		<use xlinkHref='#ys-logo-web'/>
	</svg>)

export default LogoLink
