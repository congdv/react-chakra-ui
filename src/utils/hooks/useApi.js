import { useState, useCallback } from 'react';
import { logError } from 'utils/logger';
import { getStoredAccessToken } from 'utils/authToken';

const defaultOptions = {
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API_BASE_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1`;

const useApi = () => {
  const [state, setState] = useState({ data: undefined, errors: [], success: false, isLoading: false });

  const callbackApi = useCallback(async (url, options, isAuthorize = false) => {
    const fetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    if(isAuthorize) {
      fetchOptions.headers[`Authorization`] = `Bearer ${getStoredAccessToken()?.accessToken ?? null}`
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      let response = await await fetch(`${API_BASE_URL}${url}`, fetchOptions);
      response = await response.json();

      setState({
        isLoading: false,
        data: response,
        success: true,
        // eslint-disable-next-line valid-typeof
        errors: typeof response.message === 'array' ? response.message : [response.message] ?? [],
      });
    } catch (error) {
      logError('API failed', error);
    }
  }, []);

  return [state, callbackApi];
};

export default useApi;
