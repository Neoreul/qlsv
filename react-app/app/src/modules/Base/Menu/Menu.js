import React from 'react';

import './Menu.css';

import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

import { checkLogin } from '../../Auth/Auth.services';

import { AppConfig } from '../../../config/index';
import { getCookie } from '../../Utils/Cookies';

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false,
			user: null
		};
	}

	componentDidMount() {
		this.checkLogin();
	}

	checkLogin() {
		let isLoggedIn = checkLogin();

		this.setState({ isLoggedIn });

		if(isLoggedIn) {
			this.setState({ user: JSON.parse(getCookie(AppConfig.COOKIE_VALUE.USER)) });
		}
	}

	logoutSubmit() {
		this.setState({ isLoggedIn: false, user: null });
	}

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		let menu;

		if(isLoggedIn) {
			menu = <UserMenu user={this.state.user} logout={() => this.logoutSubmit()}/>;
		} else {
			menu = <GuestMenu/>;
		}

		return (
			<div className="menu">
				{menu}
			</div>
		);
	}
}

export default Menu;