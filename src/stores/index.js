import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { initialState, rootReducers, StoreActionTypes } from './reducers';

const middleware = [thunk];

const enhancedRootReducers = (state, action) => {
  if (action.type === StoreActionTypes.RESET_STORE) {
    return rootReducers(undefined, action);
  }
  return rootReducers(state, action);
};

const store = createStore(enhancedRootReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
