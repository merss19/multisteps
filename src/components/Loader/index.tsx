import * as React from 'react'

interface OwnProps {
	text?: string
}

export const Loader: React.SFC<OwnProps> = ({text}) => {
	return(
		<div className='text-center'>
			<h2 className='pt20'>{text}</h2>
			<div className='loader loader--main' />
		</div>
	)
}

Loader.defaultProps = {
	text: 'Загружается',
}