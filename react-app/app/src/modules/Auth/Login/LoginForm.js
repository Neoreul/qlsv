import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import InputText from '../../Base/InputText/InputText';

import { login } from '../Auth.services';

import { setUser } from '../../../actions/index';

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: "",
				password: ""
			},
			isError: false,
			notify: ""
		};

		// console.log(this.props);

		this.login = this.login.bind(this);
	}

	render() {
		const {isError, notify } = this.state;

		return (
			<form onSubmit={this.login}>

				<div className={'notify ' + (isError ? 'active': '')}>
					{notify}
				</div>

				<InputText 
					type="text"
					name="username"
					id="username"
					label="Username"
					required="true"
					changeValue={(username) => this.getUsername(username)} />
				<InputText 
					type="password"
					name="password"
					id="password"
					label="Password"
					required="true"
					changeValue={(password) => this.getPassword(password)} />

				<div className="action">
					<button className="button" type="submit">Login</button>
					<p>
						<span>Don't have an account? </span>
						<Link to="/sign-up">Sign Up now!</Link>
					</p>
				</div>
			</form>
		);
	}

	login(e) {
		// console.log(this.state.user);
		e.preventDefault();

		this.setState({ isError: false, notify: "" });

		login(this.state.user)
			.then(resData => {

				if(resData.ok && resData.ok === 1) {
					this.props.dispatch(setUser({ user: resData.user, isLoggedIn: true }));
					this.props.submit(true);
				}

				if(resData.err && resData.err === 1) {
					this.setState({ isError: true, notify: resData.msg });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getUsername(value) {
		this.setState(prevState => ({
			user: {
				...prevState.user,
				username: value
			}
		}));
	}

	getPassword(value) {
		this.setState(prevState => ({
			user: {
				...prevState.user,
				password: value
			}
		}));
	}
}

export default connect()(LoginForm);