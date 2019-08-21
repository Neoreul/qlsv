import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { CookieService } from '../Base/Cookie/cookie.service';

import { AppConfig } from '../../config/index';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class RestfulAPI {
	constructor(
		private cookieService: CookieService,
		private http: Http) { }

	post(url: string, data: any = {}, config_headers: any = AppConfig.HTTP_HEADERS): Promise<any>{

		data.sessionID = this.cookieService.get(AppConfig.COOKIE_VALUE.SESSIONID);
		return this.http
			.post(AppConfig.SERVER_URI + url, JSON.stringify(data), { headers: config_headers })
			.map(res => res.json())
			.toPromise();
	}
}
