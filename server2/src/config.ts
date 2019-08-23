const domain   = "http://localhost:3300";
const app_port = 3001;

export const config = {
	secret           : 'jfRj34%jd@1djf@R9fV#jv<rt4?47r/rdrgR-+84mbvFG',
	cipher_password  : 'F7jr#d$3^65@',
	connection_string   : 'mongodb://@localhost:27017/qlsv',

	app_port         : app_port,
	domain           : domain,
	sharing_host     : ["http://localhost:" + app_port]
};