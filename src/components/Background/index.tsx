import * as React from 'react'
import {bg} from './data'

class Background extends React.Component<{}, {}> {
	render() {
		return (
			<div className='entry__bg'>
				{bg}
			</div>
		)
	}
}

export default Background