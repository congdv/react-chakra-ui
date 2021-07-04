import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'stores/account';
import useUserAuth from 'utils/hooks/useUserAuth';
import { WORKSPACE_BASE_ROUTE } from './constants';
import { Spinner } from '@chakra-ui/spinner';

export const PublicRoute = ({ component: Component, redirect = true, ...rest }) => {
  const authenticated = useSelector(isAuthenticated);
  const userLoaded = useUserAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (!userLoaded) {
          return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />;
        }
        if (authenticated && redirect) {
          return <Redirect to={WORKSPACE_BASE_ROUTE} />;
        }
        return <Component />;
      }}
    />
  );
};
