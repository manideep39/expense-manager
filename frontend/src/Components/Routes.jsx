import React from 'react';
import { Switch } from 'react-router-dom';

import LoginPage from './LoginPage';
import PublicRoute from './PublicRoute.jsx';
import RegisterPage from './RegisterPage';
import PrivateRoute from './PrivateRoute.jsx';
import DashBoard from './DashBoard';
import Ledger from './Ledger';
import Home from './Home';

export default function() {
	return (
		<Switch>
			<PublicRoute component={Home} restricted={false} path="/" exact />
			<PublicRoute component={RegisterPage} restricted={true} path="/register" exact />
			<PublicRoute component={LoginPage} restricted={true} path="/login" />
			<PrivateRoute component={DashBoard} path="/dashboard" exact />
			<PrivateRoute component={Ledger} path="/ledger" exact />
		</Switch>
	);
}
