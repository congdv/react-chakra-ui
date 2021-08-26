import store from 'store';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getStoredAccessToken = () => store.get(ACCESS_TOKEN_KEY);

export const storeAccessToken = (token) => store.set(ACCESS_TOKEN_KEY, token);

export const removeStoredAccessToken = () => store.remove(ACCESS_TOKEN_KEY);


export const getStoredRefreshToken = () => store.get(REFRESH_TOKEN_KEY);

export const storeRefreshToken = (token) => store.set(REFRESH_TOKEN_KEY, token);

export const removeStoredRefreshToken = () => store.remove(REFRESH_TOKEN_KEY);