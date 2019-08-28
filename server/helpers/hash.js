let crypto = require('crypto');
let config = require('../config');

module.exports = (value) => {
	return crypto.createHmac('sha256', config.secret).update(value).digest('hex');
};
