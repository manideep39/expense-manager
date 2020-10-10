import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './login-reg/reducer';
import expenseReducer from './expense/reducer'

const rootReducer = combineReducers({ auth: authReducer ,expense:expenseReducer});

const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export default createStore(rootReducer, enhancer);
