import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import './App.css';

import Layout   from './modules/Base/Layout/Layout';
import MyHeader from './modules/Base/MyHeader/MyHeader';
import MyFooter from './modules/Base/MyFooter/MyFooter';

import About    from './modules/About/About';
import Login    from './modules/Auth/Login/Login';
import SignUp   from './modules/Auth/SignUp/SignUp';
import PageNotFound from './modules/PageNotFound/PageNotFound';

import { checkLogin } from './modules/Auth/Auth.services';

const auth = {
	isAuthenticated: checkLogin()
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		auth.isAuthenticated === true
		? <Component {...props} />
		: <Redirect to='/login' />
	)} />
)

function App() {

	return (
		<BrowserRouter>
			<div>
				<Layout>
					<MyHeader />
				    <div className="container">
						<div id="main" className="clearfix">
							<Switch>
								{/*<Route exact path="/" component={ About }/>*/}
								<Route path="/login" component={ Login }/>
								<Route path="/sign-up" component={ SignUp } />

								<PrivateRoute exact path='/' component={ About } />

								
								<Route component={ PageNotFound }/>
								{/*<Redirect to="/404" />*/}
							</Switch>
						</div>
				    </div>
					<MyFooter />
				</Layout>
	    	</div>
		</BrowserRouter>
	);
}

export default App;
