import React from 'react';
import { Link } from 'react-router-dom';

class GuestMenu extends React.Component {
	render() {
		return (
			<ul>
				<li>
					<Link to="/sign-up">
						<span>Sign Up</span>
					</Link>
				</li>
				<li>
					<Link to="/login">
						<span>Login</span>
					</Link>
				</li>
			</ul>
		);
	}
}

export default GuestMenu;