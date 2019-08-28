import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkLogin } from '../../Auth/Auth.services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		checkLogin() === true
		? <Component {...props} />
		: <Redirect to='/login' />
	)} />
);