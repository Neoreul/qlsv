import React            from 'react';
import { 
	BrowserRouter, 
	Switch, 
	Route }   from 'react-router-dom';

import Layout           from './modules/Base/Layout/Layout';
import MyHeader         from './modules/Base/MyHeader/MyHeader';
import MyFooter         from './modules/Base/MyFooter/MyFooter';

import About            from './modules/About/About';
import Login            from './modules/Auth/Login/Login';
import SignUp           from './modules/Auth/SignUp/SignUp';
import DashBoard        from './modules/Admin/DashBoard/DashBoard';
import ManageClasses    from './modules/Admin/ManageClasses/ManageClasses/ManageClasses';
import ManageStudents   from './modules/Admin/ManageStudents/ManageStudents/ManageStudents';
import ManageTeachers   from './modules/Admin/ManageTeachers/ManageTeachers/ManageTeachers';
import ManageSubjects   from './modules/Admin/ManageSubjects/ManageSubjects/ManageSubjects';
import ModifyClass      from './modules/Admin/ManageClasses/ModifyClass/ModifyClass';
import ModifyTeacher    from './modules/Admin/ManageTeachers/ModifyTeacher/ModifyTeacher';
import PageNotFound     from './modules/PageNotFound/PageNotFound';

import { PrivateRoute } from './modules/Base/PrivateRoute/index';

function App() {

	return (
		<BrowserRouter>
			<div>
				<Layout>
					<MyHeader />
				    <div className="container">
						<div id="main" className="clearfix">
							<Switch>
								{/*<Route exact path="/" component={ About } />*/}
								<Route path="/login" component={ Login } />
								<Route path="/sign-up" component={ SignUp } />

								<PrivateRoute exact path='/' component={ About } />
								<PrivateRoute path="/admin/dashboard" component={ DashBoard } />
								<PrivateRoute exact path="/admin/classes" component={ ManageClasses } />
								<PrivateRoute path="/admin/classes/create" component={ ModifyClass } />
								<PrivateRoute path="/admin/classes/edit/:id" component={ ModifyClass } />
								<PrivateRoute exact path="/admin/students" component={ ManageStudents } />
								<PrivateRoute exact path="/admin/teachers" component={ ManageTeachers } />
								<PrivateRoute path="/admin/teachers/create" component={ ModifyTeacher } />
								<PrivateRoute path="/admin/teachers/edit/:id" component={ ModifyTeacher } />
								<PrivateRoute exact path="/admin/subjects" component={ ManageSubjects } />
								
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
