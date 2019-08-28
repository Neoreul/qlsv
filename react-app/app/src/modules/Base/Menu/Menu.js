import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setUser } from '../../../actions/index';

import './Menu.css';

import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

// import { checkLogin } from '../../Auth/Auth.services';

import { AppConfig } from '../../../config/index';
import { getCookie } from '../../Utils/Cookies';

class Menu extends React.Component {
	logoutSubmit() {
		this.props.dispatch(setUser({ user: null, isLoggedIn: false }));
		this.props.history.push('/login');
	}

	render() {

		// console.log(this.props);

		const { isLoggedIn, user } = this.props;
		let menu;

		if(isLoggedIn) {
			menu = <UserMenu user={user} logout={() => this.logoutSubmit()}/>;
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

const mapStateToProps = (state) => {
	return {
		user: state.user.user,
		isLoggedIn: state.user.isLoggedIn
	};
};

export default connect(mapStateToProps)(withRouter(Menu));