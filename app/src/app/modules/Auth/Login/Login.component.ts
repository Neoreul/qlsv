import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AuthService } from '../Auth.services';
import { CookieService } from '../../Base/Cookie/cookie.service';

import { AppConfig } from '../../../config/index';

import { Observable } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './Login.component.html',
	styleUrls: ['../../SignUp/SignUp.component.css', './Login.component.css']
})

export class LoginComponent { 
	isLogged : boolean;
	isError  : boolean = false;
	notify   : string;
	message  : string;

	constructor(
		private authService: AuthService,
		private cookieService: CookieService,
		private router: Router) {
		// this.setMessage();
		this.checkLogin();
	}

	setMessage() {
		// console.log(this.authService.isLoggedIn);
		this.message = 'Logged ' + (this.isLogged ? 'in!' : 'out!');
	}

	checkLogin() {
		this.isLogged = (this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID) != "") ? true : false;

		if(this.isLogged) {
			// this.router.navigate(['admin/dashboard']);
			this.setMessage();
		}
	}

	login(userData: any) {
		this.message = "Trying to log in...";
		this.isError = false;
		this.notify  = "";

		this.authService
			.login(userData)
			.then(resData => {
				// console.log("#Client.userLogin: ", resData);

				this.setMessage();

				// console.log(this.authService.isLoggedIn);

				if(this.authService.isLoggedIn) {

					// let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'admin/dashboard';

					// let navigationExtras: NavigationExtras = {
					// 	queryParamsHandling: 'preserve',
					// 	preserveFragment   : true
					// };

					setTimeout(() => {
						this.router.navigate(["admin/dashboard"]);
					}, 1500);
				}

				if(resData.err && resData.err === 1) {
					this.isError = true;
					this.notify = resData.msg;
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	logout() {
		this.authService.logout();
		this.setMessage();
	}
}