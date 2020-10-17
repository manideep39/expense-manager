import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function({ component: Component, restricted, ...rest }) {
	const loginStatus = useSelector((state) => state.auth.loginStatus);

	return (
		<Route {...rest} render={() => (loginStatus && restricted ? <Redirect to="/" /> : <Component />)} />
	);
}
