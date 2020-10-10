import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from '../redux/login-reg/actions.js';

export default function() {
	const dispatch = useDispatch();
	const isError = useSelector((state) => state.auth.isError);
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<div>
			<input type="text" onChange={(e) => setName(e.target.value)} />
			<input type="text" onChange={(e) => setEmail(e.target.value)} />
			<input type="text" onChange={(e) => setPassword(e.target.value)} />
			<button onClick={() => dispatch(register({ name, email, password }))}>Register</button>
			{isError && <h3>Registration failed</h3>}
		</div>
	);
}
