import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import { history } from './history';
import { PublicRoute } from './PublicRoute';
import * as routes from './constants';

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* Public Routes */}
        <PublicRoute exact path={routes.BASE_ROUTE} component={LoginPage} />

        {/* User Routes */}
        {/* <PublicRoute exact path={routes.USER_SIGNUP_ROUTE_PATH} component={SignUp} />
        <PublicRoute exact path={routes.USER_LOGIN_ROUTE_PATH} component={Login} /> */}

        {/* Workspace Routes */}
        {/* <Route exact path="/" render={() => <Redirect to={routes.WORKSPACE_BASE_ROUTE} />} />
        <PrivateRoute exact path={routes.WORKSPACE_BASE_ROUTE} component={Dashboard} />
        <PrivateRoute exact path={routes.WORKSPACE_REVIEW_ROUTE} component={App} />
        <PrivateRoute exact path={routes.WORKSPACE_CREATE_ROUTE} component={Editor} />
        <PrivateRoute exact path={routes.WORKSPACE_EDIT_ROUTE} component={Editor} /> */}
      </Switch>
    </Router>
  );
  return <div>Heloo world</div>
};
