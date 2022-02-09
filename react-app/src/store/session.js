import { csrfFetch } from "../helpers";

// constants
const GET_USER = "session/GET_USER";
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const getUser = (user) => ({
	type: GET_USER,
	payload: user
})

const setUser = (user) => ({
	type: SET_USER,
	payload: user
});

const removeUser = () => ({
	type: REMOVE_USER,
})

const initialState = { user: null };

export const fetchUserData = ({ userId }) => async (dispatch) => {
	const response = await csrfFetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})

	if (response.ok) {
		const { id, username, email, errors } = await response.json();
		if (errors) {
			return;
		} else {
			dispatch(getUser({ id, username, email }));
		}
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await csrfFetch('/api/auth/', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
}

export const login = (email, password) => async (dispatch) => {
	const response = await csrfFetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});


	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data))
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
}

export const demoLogin = () => async (dispatch) => {
	const response = await csrfFetch('/api/users/1');


	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data))
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
}

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/auth/logout', {
		headers: {
			'Content-Type': 'application/json',
		}
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};


export const signUp = (username, email, password) => async (dispatch) => {
	const response = await csrfFetch('/api/auth/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data))
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.']
	}
}

export default function reducer(state = initialState, action) {
	let updatedState = { ...state };
	switch (action.type) {
		case GET_USER:
			updatedState[action.payload.id] = action.payload;
			return updatedState;
		case SET_USER:
			updatedState.user = action.payload;
			return updatedState;
		case REMOVE_USER:
			updatedState.user = null;
			return updatedState;
		default:
			return state;
	}
}
