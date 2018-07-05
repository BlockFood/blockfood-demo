import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from './Reducers'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
