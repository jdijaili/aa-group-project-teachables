import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, demoLogin } from '../../store/session';
import './Auth.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to='/' />;
	}

	return (
		<div className='login-body'>
			<form className='auth-form' onSubmit={onLogin}>
				<input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
				<input className='auth-input'
					name='email'
					type='text'
					placeholder='Email'
					value={email}
					required={true}
					onChange={updateEmail}
				/>
				<input className='auth-input'
					name='password'
					type='password'
					placeholder='Password'
					value={password}
					required={true}
					onChange={updatePassword}
				/>
				<button className='auth-button' type='submit'>Login</button>
				<div className='auth-options'>
					<p>New to Teachables? <Link className='auth-links' to='/sign-up'>Sign up {'>>'}</Link></p>
					<p><span className='auth-links' onClick={e => dispatch(demoLogin())}>Continue as demo user {'>>'}</span></p>
				</div>
				{errors.map((error, ind) => (
					<div className='auth-errors'>
						<div key={ind}>{error}</div>
					</div>
				))}
			</form>
		</div>
	);
};

export default LoginForm;
