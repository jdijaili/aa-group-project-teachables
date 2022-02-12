import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp, demoLogin } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			await dispatch(signUp(username, email, password))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		} else {
			setErrors([...errors, 'Passwords must match!']);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='signup-body'>
			<form className='auth-form' onSubmit={onSignUp}>
				<input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
				<input className='auth-input'
					type='text'
					name='username'
					onChange={updateUsername}
					value={username}
					required={true}
					placeholder='Username'
				></input>
				<input className='auth-input'
					type='text'
					name='email'
					onChange={updateEmail}
					value={email}
					required={true}
					placeholder='Email'
				></input>
				<input className='auth-input'
					type='password'
					name='password'
					onChange={updatePassword}
					value={password}
					required={true}
					placeholder='Password'
				></input>
				<input className='auth-input'
					type='password'
					name='repeat_password'
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
					placeholder='Enter password again'
				></input>
				<button className='auth-button' type='submit'>Sign Me Up!</button>
				<div className='auth-options'>
					<p>Already have an account? <Link className='auth-links' to='/login'>Log in!</Link></p>
					<p><span className='auth-links' onClick={e => dispatch(demoLogin())}>Continue as demo user {'>>'}</span></p>
				</div>
				{errors.map((error, ind) => (
					<div className='auth-errors' key={ind}>
						<div>{error}</div>
					</div>
				))}
			</form >
		</div >
	);
};

export default SignUpForm;
