let domain   = "http://localhost:3000";
let app_port = 3001;

module.exports = {
	secret           : 'jfRj34%jd@1djf@R9fV#jv<rt4?47r/rdrgR-+84mbvFG',
	cipher_password  : 'F7jr#d$3^65@',
	connection_string   : 'mongodb://@localhost:27017/qlsv',

	app_port         : app_port,
	domain           : domain,
	sharing_host     : ["http://localhost:" + app_port]
};