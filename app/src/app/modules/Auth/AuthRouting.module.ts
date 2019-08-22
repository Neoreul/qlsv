import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './Login/Login.component';
import { SignUpComponent } from './SignUp/SignUp.component';

const authRoutes: Routes = [
	{ 
		path: 'login', 
		component: LoginComponent
	},
	{
		path: 'sign-up', 
		component: SignUpComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(authRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AuthRoutingModule {}