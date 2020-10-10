import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/login-reg/actions.js';

import Grid from '@material-ui/core/Grid';

export default function() {
	const dispatch = useDispatch();
	const isError = useSelector((state) => state.auth.isError);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	
	return (
		<div>
			<input type="text" onChange={(e) => setEmail(e.target.value)} />
			<input type="text" onChange={(e) => setPassword(e.target.value)} />
			<button onClick={() => dispatch(login({ email, password }))}>Login</button>
			{isError && <h3>Login failed</h3>}
		</div>
	);
}
