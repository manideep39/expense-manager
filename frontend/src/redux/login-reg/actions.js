import axios from 'axios';

import {
	LOGIN_ATTEMPT,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REG_ATTEMPT,
	REG_SUCCESS,
	REG_FAILURE,
	LOGOUT
} from './actionTypes';

const loginAttempt = () => ({
	type: LOGIN_ATTEMPT
});

const loginSuccess = (payload) => ({
	type: LOGIN_SUCCESS, 
	payload
});

const loginFailure = () => ({
	type: LOGIN_FAILURE
});

export const login = (payload) => (dispatch) => {
	dispatch(loginAttempt());
	return axios
		.post('http://localhost:9000/api/user/login', payload)
		.then((res) => dispatch(loginSuccess(res.data)))
		.catch((err) => dispatch(loginFailure()));
};

const regAttempt = () => ({
	type: REG_ATTEMPT
});

const regSuccess = () => ({
	type: REG_SUCCESS
});

const regFailure = () => ({
	type: REG_FAILURE
});

export const register = (payload) => (dispatch) => {
	dispatch(regAttempt());
	return axios
		.post('http://localhost:9000/api/user/register', payload)
		.then((res) => dispatch(regSuccess(res.data)))
		.catch((err) => dispatch(regFailure()));
};

export const logout = () => ({
	type: LOGOUT
});
