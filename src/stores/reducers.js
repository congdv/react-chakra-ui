import { combineReducers } from 'redux';

import { accountInitialState, accountReducer } from './account';
import { appReducer, appInitialState } from './app';

export const StoreActionTypes = {
  RESET_STORE: 'RESET_STORE',
};

export const initialState = {
  app: appInitialState,
  account: accountInitialState,
};

export const rootReducers = combineReducers({
  app: appReducer,
  account: accountReducer,
});
