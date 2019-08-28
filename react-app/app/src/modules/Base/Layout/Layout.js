import React from 'react';

import './Layout.css';

class Layout extends React.Component {

	componentDidMount() {
		this.initialFrontEnd();
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

export default Layout;