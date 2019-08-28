import React from 'react';

class LoginSuccess extends React.Component {

	logout() {
		this.props.submit();
	}

	render() {
		return (
			<div>
				<p className="link">{this.props.message}</p>
				<br/>
				<button className="button" onClick={this.logout}>Logout</button>
			</div>
		);
	}
}

export default LoginSuccess;