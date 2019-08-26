import axios from 'axios';
import { POST } from '../Utils/restfulAPI';

import { AppConfig } from '../../config/index';
import { AuthAPI }   from './Auth.api';

import { setCookie, getCookie, deleteCookie } from '../Utils/Cookies';

export const login = (data) => {
	let url = AppConfig.SERVER_URI + AuthAPI.LOGIN_USER;

	return new Promise((resolve, reject) => {
		axios.post(url, data, AppConfig.HTTP_HEADERS)
			.then(res => {

				if(res.data.ok && res.data.ok === 1) {
					// set cookie
					let data = res.data;
					setCookie({ name: AppConfig.COOKIE_VALUE.SESSIONID, value: data.sessionID });
					setCookie({ name: AppConfig.COOKIE_VALUE.USER, value: JSON.stringify(data.user) });
				}

				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export const logout = () => {
	let url = AppConfig.SERVER_URI + AuthAPI.LOGOUT_USER;
	return new Promise((resolve, reject) => {
		POST(url)
			.then(res => {
				deleteCookie(AppConfig.COOKIE_VALUE.SESSIONID);
				deleteCookie(AppConfig.COOKIE_VALUE.USER);

				resolve(res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export const checkLogin = () => {
	let sessionID = getCookie(AppConfig.COOKIE_VALUE.SESSIONID);

	if(!sessionID) return false;

	return true;
};