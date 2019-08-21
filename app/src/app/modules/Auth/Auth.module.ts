import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './AuthRouting.module';

import { LoginComponent } from './Login/Login.component';
import { SignUpComponent } from './SignUp/SignUp.component';

import { AuthService } from './Auth.services';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AuthRoutingModule
	],
	declarations: [
		LoginComponent,
		SignUpComponent
	],
	providers: [AuthService]
})

export class AuthModule {}