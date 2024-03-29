import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuthCtx } from '../../store';
import {
	createUserWithEmailAndPassword,
	handleFbSignIn,
	handleGoogleSignIn,
	handleSignOut,
	initializeLoginFramework,
	signInWithEmailAndPassword,
} from './LoginManager';

function Login() {
	const [newUser, setNewUser] = useState(false);

	const [user, setUser] = useState({
		isSignedIn: false,
		name: '',
		email: '',
		password: '',
		photo: '',
		error: '',
		success: false,
	});

	initializeLoginFramework();

	const [loggedInUser, setLoggedInUser] = useAuthCtx();
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: '/' } };

	const googleSignIn = () => {
		handleGoogleSignIn().then((res) => {
			setUser(res);
			setLoggedInUser(res);
			history.replace(from);
		});
	};
	const signOut = () => {
		handleSignOut().then((res) => {
			setUser(res);
			setLoggedInUser(res);
		});
	};
	const fbSignIn = () => {
		handleFbSignIn().then((res) => {
			setUser(res);
			setLoggedInUser(res);
			history.replace(from);
		});
	};

	const handleBlur = (event) => {
		let isFormValid = true;
		if (event.target.name === 'email') {
			isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
		}
		if (event.target.name === 'password') {
			const isPasswordValid = event.target.value.length > 6;
			const hasPasswordNumber = /\d{1}/.test(event.target.value);
			isFormValid = isPasswordValid && hasPasswordNumber;
		}
		if (isFormValid) {
			const newUserInfo = { ...user };
			newUserInfo[event.target.name] = event.target.value;
			setUser(newUserInfo);
		}
	};
	const handleSubmit = (e) => {
		if (newUser && user.email && user.password) {
			createUserWithEmailAndPassword(user.email, user.password).then((res) => {
				setUser(res);
				setLoggedInUser(res);
				history.replace(from);
			});
		}
		if (!newUser && user.email && user.password) {
			signInWithEmailAndPassword(user.email, user.password).then((res) => {
				setUser(res);
				setLoggedInUser(res);
				history.replace(from);
			});
		}
		e.preventDefault();
	};
	return (
		<div style={{ textAlign: 'center' }}>
			{user.isSignedIn ? (
				<Button variant="warning" onClick={signOut}>
					Sign Out
				</Button>
			) : (
				<Button variant="danger" onClick={googleSignIn}>
					Sign In Using Google
				</Button>
			)}
			{user.isSignedIn && (
				<div>
					<p>Welcome, {user.name}</p>
					<p>Email: {user.email}</p>
					<img height="100px" src={user.photo} alt="" />
				</div>
			)}
			<br /> <br />
			<Button variant="primary" onClick={fbSignIn}>
				Sign In Using Facebook
			</Button>
			<h1>Our Own Authentication</h1>
			<input onClick={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
			<label htmlFor="newUser">New User Sign Up</label>
			<Form onSubmit={handleSubmit}>
				{newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="Your name" />}
				<br />
				<input name="email" onBlur={handleBlur} type="text" placeholder="type your email" required />
				<br />
				<input name="password" onBlur={handleBlur} type="password" placeholder="type your password" required />
				<br />
				<input type="submit" value={newUser ? 'Sign Up' : 'Log In'} />
			</Form>
			<p style={{ color: 'red' }}>{user.error}</p>
			{user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
		</div>
	);
}

export default Login;
