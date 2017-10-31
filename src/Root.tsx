import * as React from 'react'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store'
import getRoutes from './routes'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
	<Provider store={store}>
		<Router history={history}>
			{getRoutes(store)}
		</Router>
	</Provider>
)

export default Root