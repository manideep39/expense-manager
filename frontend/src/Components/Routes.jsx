import React from 'react';
import { Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import PublicRoute from './PublicRoute.jsx';
import RegisterPage from './RegisterPage';
import PrivateRoute from './PrivateRoute.jsx';
import Ledger from './Ledger';
import Dashboard from './dashboard/Dashboard'

export default function() {
	return (
		<Switch>
			<PrivateRoute component={Dashboard} path="/" exact />
			<PrivateRoute component={Ledger} path="/ledger" exact />
			<PublicRoute component={RegisterPage} restricted={true} path="/register" exact />
			<PublicRoute component={LoginPage} restricted={true} path="/login" />
		</Switch>
	);
}
