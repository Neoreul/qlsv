import React from 'react';

import '../SignUp/SignUp.css';

import { checkLogin } from '../Auth.services';

import SignUpFrom from './SignUpForm';

class SignUp extends React.Component {

	componentDidMount() {
		this.checkLogin();
	}

	checkLogin() {
		let isLoggedIn = checkLogin();
		if(isLoggedIn) {
			this.props.history.push('/admin/dashboard');
		}
	}

	signUpSuccess() {
		this.props.history.push('/login');
	}

	render() {
		return (
			<div className="login-signup">
				<div className="head-content clearfix">
					<div className="feature-img">
					</div>
					<h1 className="title">Sign Up</h1>
				</div>
				<div className="body-content">
					<SignUpFrom success={() => this.signUpSuccess()}/>
				</div>
			</div>
		);
	}
}

export default SignUp;