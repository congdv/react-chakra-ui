import { createSelector } from 'reselect';

const AppTypes = {
  SET_LOADING: 'app/SET_LOADING',
  SHOW_ALERT: 'app/SHOW_ALERT',
  HIDE_ALERT: 'app/HIDE_ALERT',
};

export const appInitialState = {
  loading: false,
  alerts: [],
};

/** REDUCERS **/

export const appReducer = (state = appInitialState, action) => {
  switch (action.type) {
    case AppTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AppTypes.SHOW_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case AppTypes.HIDE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id !== action.payload.id),
      };
    default:
      return state;
  }
};

/** ACTIONS **/

export const setLoading = (payload) => {
  return { type: AppTypes.SET_LOADING, payload };
};

/** SELECTOR **/
export const getAppState = (state) => {
  return state.app;
};
export const isLoading = createSelector(getAppState, (app) => app.loading);
