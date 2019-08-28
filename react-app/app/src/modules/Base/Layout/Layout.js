import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../../../actions/index';

import './Layout.css';

import { checkLogin } from '../../Auth/Auth.services';
import { AppConfig } from '../../../config/index';
import { getCookie } from '../../Utils/Cookies';

class Layout extends React.Component {

	componentDidMount() {
		this.initialFrontEnd();
		this.checkLogin();
	}

	checkLogin() {
		let isLoggedIn = checkLogin();
		// console.log("isLoggedIn: ", isLoggedIn);

		if(isLoggedIn) {
			let user = getCookie(AppConfig.COOKIE_VALUE.USER);
			// console.log("user: ", user);
			this.props.dispatch(setUser({ user: JSON.parse(user), isLoggedIn }));
		}
	}

	initialFrontEnd() {
		// Page script
	    const mainElm    = document.getElementById("main");
	    const headerElm  = document.getElementsByTagName("header")[0];
	    const footerElm  = document.getElementsByTagName("footer")[0];

	    const mainHeight = window.innerHeight - headerElm.clientHeight - footerElm.clientHeight;
	    mainElm.style.minHeight = mainHeight + "px";
	}

	render() {
		const children = this.props.children;

		return (
			<div>
				{children}
			</div>
		);
	}
}

export default connect()(Layout);