import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import { history } from './history';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import * as routes from './constants';
import Dashboard from 'pages/Dashboard';

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        
        {/* Public Routes */}
        {/* <PublicRoute exact path={routes.USER_SIGNUP_ROUTE_PATH} component={SignUp} /> */}
        <PublicRoute exact path={routes.USER_LOGIN_ROUTE_PATH} component={LoginPage} />

        {/* Workspace Routes */}
        <Route exact path="/" render={() => <Redirect to={routes.WORKSPACE_BASE_ROUTE} />} />
        <PrivateRoute exact path={routes.WORKSPACE_BASE_ROUTE} component={Dashboard} />
        {/* <PrivateRoute exact path={routes.WORKSPACE_REVIEW_ROUTE} component={App} />
        <PrivateRoute exact path={routes.WORKSPACE_CREATE_ROUTE} component={Editor} />
        <PrivateRoute exact path={routes.WORKSPACE_EDIT_ROUTE} component={Editor} />  */}
      </Switch>
    </Router>
  );
  return <div>Heloo world</div>
};
