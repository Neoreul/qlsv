import React from 'react';

import './MyFooter.css';

class MyFooter extends React.Component {
	render() {
		return (
			<footer>
				<div className="wrapper">
					<p className="end">© 2019 By <a href="http://doanvanhuy.com" title="Doan Van Huy">Neoreul</a>. All Rights Reserved</p>
				</div>
			</footer>
		);
	}
}

export default MyFooter;