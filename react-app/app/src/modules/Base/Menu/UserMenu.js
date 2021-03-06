import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../Auth/Auth.services';

class UserMenu extends React.Component {

	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}
	
	logout() {
		logout()
			.then(resData => {

				if(resData.ok && resData.ok === 1) {
					this.props.logout();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<ul className="menu-account">
				<li>
					<Link to="/admin/dashboard">
						<i className="fa fa-user-circle-o" aria-hidden="true" style={{marginRight: '5px'}}></i>
						<span>Hi, {this.props.user.first_name}</span>
					</Link>
				</li>
				<li>
					<a onClick={this.logout}>
						<i className="fa fa-sign-out" aria-hidden="true" style={{marginRight: '5px'}}></i>
						<span>Logout</span>
					</a>
				</li>
			</ul>
		);
	}
}

export default UserMenu;