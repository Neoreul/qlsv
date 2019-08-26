import React from 'react';

import './MyHeader.css';

import Menu from '../Menu/Menu';

class MyHeader extends React.Component {
	render() {
		return (
			<header className="clearfix">
				<div className="logo">
					<a href="/">
						<h3>My Courses</h3>
					</a>
				</div>
				<Menu />
			</header>
		);
	}
}

export default MyHeader;