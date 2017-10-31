import * as React from 'react'
import { SignUp }  from '../../modules/SignUp'
import {LayoutRegistration} from '../../components/LayoutRegistration'
import {RouterState} from 'react-router'

class PageSignUp extends React.Component<RouterState, {}> {

	render() {
		const pathname = this.props.location.pathname
		const pathnameArr = pathname.split('/')
		const program: any = pathnameArr.pop()
		return (
			<LayoutRegistration notLogo={true}>
				<SignUp programName={program}/>
			</LayoutRegistration>
		)
	}
}

export default PageSignUp