import crypto from 'crypto';
import { config } from '../config';

export const hash = (value: string) => {
	return crypto.createHmac('sha256', config.secret).update(value).digest('hex');
};