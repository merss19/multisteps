import * as React from 'react'
import { ProfileLogin }  from '../../modules/ProfileLogin'
import {LayoutRegistration} from '../../components/LayoutRegistration'

class PageProfileLogin extends React.Component<{}, {}> {

	render() {
		return (
			<LayoutRegistration >
				<ProfileLogin />
			</LayoutRegistration>

		)
	}
}

export default PageProfileLogin