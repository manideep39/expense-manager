import {
	LOGIN_ATTEMPT,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REG_ATTEMPT,
	REG_SUCCESS,
	REG_FAILURE,
	LOGOUT
} from './actionTypes';

const initialState = {
	loginStatus: false,
	isLoading: false,
	isError: false,
	name: '',
	user_id: '',
	message: '',
	validation: ''
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_ATTEMPT:
			return { ...state, isLoading: true, message: '', validation: '' };
		case LOGIN_SUCCESS: {
			const { name, user_id } = payload;
			return { ...state, isLoading: false, loginStatus: true, name, user_id };
		}
		case LOGIN_FAILURE: {
			const { message, validation } = payload;
			return { ...state, isLoading: false, isError: true, message, validation };
		}
		case REG_ATTEMPT:
			return { ...state, isLoading: true, message: '', validation: '', isError: false };
		case REG_SUCCESS:
			return { ...state, isLoading: false, loginStatus: true };
		case REG_FAILURE: {
			const { validation, message } = payload;
			return { ...state, isLoading: false, isError: true, validation, message };
		}
		case LOGOUT:
			return { ...state, loginStatus: false, message: '', validation: '', user_id: '', name: '' };
		default:
			return state;
	}
};
