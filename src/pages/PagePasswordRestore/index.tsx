import * as React from 'react'
import ProfilePasswordForget from '../../modules/ProfilePasswordForget'
import {LayoutRegistration} from '../../components/LayoutRegistration'
import {RouterState} from 'react-router'

class PagePasswordRestore extends React.Component<RouterState, {}> {

	render() {
		return (
			<LayoutRegistration >
				<ProfilePasswordForget />
			</LayoutRegistration>

		)
	}
}

export default PagePasswordRestore