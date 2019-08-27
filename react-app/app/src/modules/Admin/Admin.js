import React from 'react';
import { Link } from 'react-router-dom';

import './Admin.css';

class Admin extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isShowMenu: false
		};
	}

	componentDidMount() {
		this.initialFrontEnd();
	}

	initialFrontEnd() {
		// Page script
        const mainElm    = document.getElementById("main");
        const footerElm  = document.getElementsByTagName('footer')[0];
        const leftMenuElm= document.getElementById('left-menu');

        // padding-top: 10px
        leftMenuElm.style.minHeight = (mainElm.clientHeight - 10 + footerElm.clientHeight) + "px";
	}

	toggleMenu() {
		let isShowMenu = !this.isShowMenu;
		this.setState({ isShowMenu: isShowMenu });
	}

	render() {
		const { isShowMenu } = this.state;
		const { children }   = this.props;

		return (
			<div className="admin">
				<button id="btn-menu" onClick={this.toggleMenu}>
					<i className="fa fa-bars" aria-hidden="true"></i>
				</button>

				<nav id="left-menu" className={isShowMenu? 'show': ''}>
					<h1>
						<Link to="/admin/dashboard">ADMIN</Link>
						<i className="fa fa-times close" aria-hidden="true" onClick={this.toggleMenu}></i>
					</h1>
					<Link to="/admin/dashboard">Dashboard</Link>
					<Link to="/admin/classes">Classes</Link>
					<Link to="/admin/students">Students</Link>
					<Link to="/admin/teachers">Teachers</Link>
					<Link to="/admin/subjects">Subjects</Link>
				</nav>

				<div id="main-admin">
					{ children }
				</div>

			</div>
		);
	}
}

export default Admin;