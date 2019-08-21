import { Injectable } from '@angular/core';

import {
	CanActivate, Router, 
	ActivatedRouteSnapshot, 
	RouterStateSnapshot, 
	CanActivateChild, 
	NavigationExtras, 
	CanLoad, Route
}                     from '@angular/router';
import { AuthService } from './Auth.services';
import { CookieService } from '../Base/Cookie/cookie.service';

import { AppConfig } from '../../config/index';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

	constructor(
		private authService: AuthService, 
		private cookieService: CookieService,
		private router     : Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

    	return this.checkLogin(url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	canLoad(route: Route): boolean {
		let url = `/$route.path`;

		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean {
		if(this.authService.isLoggedIn) return true;

		// get cookie
		let sessionId = this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID);
		// console.log("#Client.checkLogin.sessionId: ", sessionId);

		if(sessionId) {
			this.authService.isLoggedIn = true;
			return true;
		}

		this.authService.redirectUrl = url;

		// let sessionId = 123456789;

		// let navigationExtras: NavigationExtras = {
		// 	queryParams: { 'session_id': sessionId },
		// 	fragment   : 'anchor'
		// };

		// this.router.navigate(['login'], navigationExtras);
		this.router.navigate(['login']);

		return false;
	}

}