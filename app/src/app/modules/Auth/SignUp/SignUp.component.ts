import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth.services';

import { CookieService }     from '../../Base/Cookie/cookie.service';
import { AppConfig }         from '../../../config/index';

@Component({
	selector: 'app-signup',
	templateUrl: './SignUp.component.html',
	styleUrls: ['./SignUp.component.css']
})

export class SignUpComponent implements OnInit {
	isError: boolean = false;
	notify : string;

	constructor(
		private authService: AuthService,
		private cookieService: CookieService,
		private router: Router) {}

	ngOnInit() {
		this.checkLogin();
	}

	checkLogin() {
		let isLogged = (this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID) != "") ? true : false;

		if(isLogged) {
			this.router.navigate(['admin/dashboard']);
		}
	}

	onSubmit(userData: any) {
		this.isError = false;
		this.notify  = "";

		this.authService
			.register(userData)
			.then(resData => {
				// console.log("#Client.userRegister: ", resData);

				if(resData.ok && resData.ok === 1) {
					this.router.navigate(['login']);
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
}