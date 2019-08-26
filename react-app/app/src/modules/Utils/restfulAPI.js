import axios from 'axios';

import { AppConfig } from '../../config/index';
import { getCookie } from './Cookies';

export const POST = (url, data = {}, config = AppConfig.HTTP_HEADERS) => {
	data.sessionID = getCookie(AppConfig.COOKIE_VALUE.SESSIONID);
	return axios.post(url, data, config);
};