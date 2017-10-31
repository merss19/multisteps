import * as React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Root from './Root'

function renderApp() {
	render(
		<AppContainer>
			<Root/>
		</AppContainer>,
		document.getElementById('root')
	)
}

if (module.hot) {
	module.hot.accept()
	renderApp()
} else {
	renderApp()
}