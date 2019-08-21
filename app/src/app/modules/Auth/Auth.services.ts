import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from '../Base/Cookie/cookie.service';

import { RestfulAPI } from '../Utils/restfulAPI';
import { AppConfig } from '../../config/index';
import { AuthAPI } from './Auth.api';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	private headers  = new Headers(AppConfig.HTTP_HEADERS);

	isLoggedIn = false;

	// store the URL so we can redirect after logging in
	redirectUrl: string;

	constructor(
		private http: Http,
		private resfulAPI: RestfulAPI,
		private cookieService: CookieService) {
	}

	register(data: any): Promise<any>{
		let url = AppConfig.SERVER_URI + AuthAPI.REGISTER_USER;
		return this.http
			.post(url, JSON.stringify(data), {headers: this.headers})
			.map(res => res.json())
			.toPromise();
	}

	login(data: any): Promise<any>{
		let url = AppConfig.SERVER_URI + AuthAPI.LOGIN_USER;
		return this.http
			.post(url, JSON.stringify(data), {headers: this.headers})
			.map(res => {
				let data = res.json();

				// console.log("#Client.Auth.service.login: ", data);

				if(data.ok && data.ok === 1) {
					this.isLoggedIn = true;
					this.cookieService.set({ name: AppConfig.COOKIE_VALUE.SESSIONID, value: data.sessionID });
					this.cookieService.set({ name: AppConfig.COOKIE_VALUE.USER, value: JSON.stringify(data.user) });
				}

				if(data.hasExpired && data.hasExpired === 1) {
					// TODO: Check at server
					this.cookieService.delete(AppConfig.COOKIE_VALUE.SESSIONID);
					this.cookieService.delete(AppConfig.COOKIE_VALUE.USER);
				}

				// console.log("cookieService: ", this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID));
				return data;
			})
			.toPromise();
	}

	logout(): Promise<any>{
		let url = AuthAPI.LOGOUT_USER;
		return this.resfulAPI.post(url).then(() => {
			this.isLoggedIn = false;
			this.cookieService.delete(AppConfig.COOKIE_VALUE.SESSIONID);
		});
	}
}