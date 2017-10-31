import * as React from 'react'
import ProfilePasswordForget from '../../modules/ProfilePasswordForget'
import {LayoutRegistration} from '../../components/LayoutRegistration'

class PagePasswordForget extends React.Component<{}, {}> {

	render() {
		return (
			<LayoutRegistration >
				<ProfilePasswordForget />
			</LayoutRegistration>

		)
	}
}

export default PagePasswordForget