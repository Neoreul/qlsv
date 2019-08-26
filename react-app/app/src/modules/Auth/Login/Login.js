import React from 'react';

import '../SignUp/SignUp.css';
import avatar from '../../../assets/images/avatar.png';

import LoginSuccess from './LoginSuccess';
import LoginForm from './LoginForm';

import { checkLogin } from '../Auth.services';

class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			message: ""
		};
	}

	componentDidMount() {
		this.checkLogin();
	}

	checkLogin() {
		// Check service here
		this.setState({ isLoggedIn: checkLogin() }, () => {
			this.setMessage();
		});
	}

	loginSubmit(value) {
		this.setState({ isLoggedIn: value }, () => {
			this.setMessage();

			if(this.state.isLoggedIn) {
				setTimeout(() => {
					this.props.history.push('/admin/dashboard');
				}, 1500);
			}
		});
	}

	logoutSubmit() {
		// TODO: call service logout here
		this.setState({ isLoggedIn: false });

		this.setMessage();
	}

	setMessage() {
		this.setState({ message: 'Logged ' + (this.state.isLoggedIn ? 'in!' : 'out!') });
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let renderContent;

		if(isLoggedIn) {
			renderContent = <LoginSuccess message={this.state.message} submit={() => this.logoutSubmit()} />;
		} else {
			renderContent = <LoginForm submit={(isLoggedIn) => this.loginSubmit(isLoggedIn)}/>;
		}

		return (
			<div className="login-signup">
				<div className="head-content clearfix">
					<div className="feature-img">
						<img src={ avatar } title="My Courses" alt="My Courses"/>
					</div>
					<h1 className="title">Login</h1>
				</div>
				<div className="body-content">
					{renderContent}
				</div>
			</div>
		);
	}
}

export default Login;