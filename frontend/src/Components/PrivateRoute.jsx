import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function({ component: Component, ...rest }) {
	//const loginStatus = useSelector((state) => state.auth.loginStatus);
	const loginStatus =true

	return (
		<Route
			{...rest}
			render={(routerProps) => (loginStatus ? <Component {...routerProps} /> : <Redirect to="/login" />)}
		/>
	);
}
