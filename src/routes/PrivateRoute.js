import React from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'stores/account';
import useUserAuth from 'utils/hooks/useUserAuth';
import { USER_LOGIN_ROUTE_PATH } from './constants';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(isAuthenticated);
  const userLoaded = useUserAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (!userLoaded) {
          return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
        }
        if (!authenticated) {
          return <Redirect to={USER_LOGIN_ROUTE_PATH} />;
        }
        return <Component />;
      }}
    />
  );
};
