import ReduxThunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducer/user';

// Add redux Logger with default options in development
const middlewares = [ReduxThunk];

if (process.env.NODE_ENV !== 'production') {
  const { createLogger } = require('redux-logger');
  middlewares.push(createLogger({ collapsed: true }));
}

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    user,
    routing: routerReducer,
  }),
  applyMiddleware(...middlewares)
);

export default store;