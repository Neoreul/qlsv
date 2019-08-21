import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService }     from '../Cookie/cookie.service';
import { AppConfig }         from '../../../config/index';

@Component({
	selector: 'app-menu',
	templateUrl: './Menu.component.html',
	styleUrls: ['./Menu.component.css']
})

export class MenuComponent implements OnInit {
	isLogged: boolean = false;
	user    : Object  = {};

	constructor(
		private router       : Router, 
		private cookieService: CookieService) {
		router.events.subscribe(val => {
			this.checkLogin();
		});
	}

	ngOnInit() {
		this.checkLogin();
	}

	checkLogin() {
		this.isLogged = (this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID) != "") ? true : false;

		if(this.isLogged) {
			this.user = JSON.parse(this.cookieService.get(AppConfig.COOKIE_VALUE.USER));
		}
	}
}