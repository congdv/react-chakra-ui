import { createSelector } from 'reselect';
import { setLoading } from 'stores/app';
import { authRequest } from 'utils/http';
import { removeStoredAccessToken, removeStoredRefreshToken } from 'utils/authToken';
import { isEmpty } from 'lodash';
import { BASE_ROUTE } from 'routes';


const AccountTypes = {
  SET_USER: 'account/SET_USER',
  LOGOUT: 'account/LOGOUT',
};

export const accountInitialState = {
  loaded: false,
  user: {
    id: 0,
    authenticated: false,
  },
};

/***** ACCOUNT REDUCERS *****/
export const accountReducer = (state = accountInitialState, action) => {
  switch (action.type) {
    case AccountTypes.SET_USER:
      return {
        ...state,
        ...action.payload,
        loaded: true,
      };
    case AccountTypes.LOGOUT:
      return {
        ...accountInitialState,
      };

    default:
      return state;
  }
};

/***** ACCOUNT ACTIONS *****/
export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: AccountTypes.SET_USER, payload: { user } });
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const { response } = await authRequest('/user/me');

    if (response) {
      dispatch(setUser(response));
    }

    dispatch(setLoading(false));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(setUserLogout());
    
  };
};

export const setUserLogout = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    removeStoredAccessToken();
    removeStoredRefreshToken();
    dispatch({ type: AccountTypes.LOGOUT });
    dispatch({ type: 'RESET_STORE' });

    dispatch(setLoading(false));
  };
};

/***** ACCOUNT SELECTORS *****/

export const getAccountState = (state) => {
  return state.account;
};

export const isUserLoaded = createSelector(getAccountState, (account) => account.loaded);

export const isAuthenticated = createSelector(getAccountState, (account) => !isEmpty(account.user));

export const currentUser = createSelector(getAccountState, (account) => account.user);
