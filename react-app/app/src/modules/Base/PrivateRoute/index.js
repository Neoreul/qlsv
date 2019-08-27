import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkLogin } from '../../Auth/Auth.services';

const auth = {
	isAuthenticated: checkLogin()
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		auth.isAuthenticated === true
		? <Component {...props} />
		: <Redirect to='/login' />
	)} />
);