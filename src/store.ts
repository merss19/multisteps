import {Store, createStore, applyMiddleware, /*compose*/} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
//import DevTools from './DevTools'
import {composeWithDevTools} from 'redux-devtools-extension'

let middleware = [thunk, logger]

/*const enhancer = compose(
	applyMiddleware(...middleware),
	DevTools.instrument()
)*/

const store: Store<any> = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(...middleware)
))

export default function configureStore() {

	if (module.hot) {
		module.hot.accept('./reducers', () => {
			const nextRootReducer = require('./reducers')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}
