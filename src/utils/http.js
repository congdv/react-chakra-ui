import { getStoredAccessToken } from './authToken';
import { logError } from './logger';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const createRequest = async (url, options = defaultOptions) => {
  const backendBasePrefix = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3001';

  let response = {};
  let error = null;

  if (options.queryParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
    delete options.queryParams;
  }

  const initOptions = {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(backendBasePrefix + url, initOptions);

    response = await res.json();
  } catch (e) {
    error = e;
    logError('Network error', error);
  }

  return { response, error };
};

export const authRequest = async (url, options = defaultOptions) => {
  return await createRequest(url, {
    ...defaultOptions,
    ...options,
    headers: {
      Authorization: `Bearer ${getStoredAccessToken()?.accessToken ?? null}`,
      ...defaultOptions.headers,
    },
  });
};

const queryParams = (params) => {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
};
