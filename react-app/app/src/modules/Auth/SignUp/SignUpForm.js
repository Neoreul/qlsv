import React from 'react';
import { Link } from 'react-router-dom';

import InputText from '../../Base/InputText/InputText';

import { signUp } from '../Auth.services';

class SignUpForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			user: {
				first_name: "",
				last_name : "",
				username  : "",
				password  : "",
				confirm_password: "",
				email     : "",
				phone     : ""
			},
			isError: false,
			notify: ""
		};

		this.signUp = this.signUp.bind(this);
	}

	render() {
		const {isError, notify } = this.state;

		return (
			<form onSubmit={this.signUp}>

				<div className={'notify ' + (isError ? 'active': '')}>
					{notify}
				</div>

				<InputText 
					type="text"
					name="first_name"
					id="first_name"
					label="First Name"
					required="true"
					changeValue={(first_name) => this.getUserProperty("first_name", first_name)} />

				<InputText 
					type="text"
					name="last_name"
					id="last_name"
					label="Last Name"
					required="true"
					changeValue={(last_name) => this.getUserProperty("last_name", last_name)} />

				<InputText 
					type="text"
					name="username"
					id="username"
					label="Username"
					required="true"
					changeValue={(username) => this.getUserProperty("username", username)} />

				<InputText 
					type="text"
					name="email"
					id="email"
					label="Email"
					required="true"
					changeValue={(email) => this.getUserProperty("email", email)} />

				<InputText 
					type="text"
					name="phone"
					id="phone"
					label="Phone"
					changeValue={(phone) => this.getUserProperty("phone", phone)} />

				<InputText 
					type="password"
					name="password"
					id="password"
					label="Password"
					required="true"
					changeValue={(password) => this.getUserProperty("password", password)} />

				<InputText 
					type="password"
					name="confirm_password"
					id="confirm_password"
					label="Confirm Password"
					required="true"
					changeValue={(confirm_password) => this.getUserProperty("confirm_password", confirm_password)} />

				<div className="action">
					<button className="button" type="submit">Register</button>
					<p>
						<span>Have an account? </span>
						<Link to="/login">Login now!</Link>
					</p>
				</div>

			</form>
		);
	}

	signUp(e) {
		e.preventDefault();

		this.setState({ isError: false, notify: "" });

		signUp(this.state.user)
			.then(resData => {
				if(resData.ok && resData.ok === 1) {
					this.props.success();
				}

				if(resData.err && resData.err === 1) {
					this.setState({ isError: true, notify: resData.msg });
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getUserProperty(key, value) {
		this.setState(prevState => {
			let user = {...prevState.user};
			user[key] = value;

			return {
				user
			};
		});
	}

}

export default SignUpForm;