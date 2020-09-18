import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import state from './state';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, state)