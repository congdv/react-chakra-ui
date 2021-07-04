import store from 'store';

const ACCESS_TOKEN_KEY = 'accessToken';

export const getStoredAccessToken = () => store.get(ACCESS_TOKEN_KEY);

export const storeAccessToken = (token) => store.set(ACCESS_TOKEN_KEY, token);

export const removeStoredAccessToken = () => store.remove(ACCESS_TOKEN_KEY);