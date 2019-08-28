let mongoose = require('mongoose');
let config   = require('./config');

let state = {
	connection: null
};

exports.connect = (done) => {
	if(state.connection) return done();

	let url = config.connection_string;

	mongoose.createConnection(url, {
		useNewUrlParser: true,
		useCreateIndex: true
	}, (err) => {
		if(err) {
			done(err);
		} else {
			state.connection = res;
			done();
		}
	});
};

exports.get = () => {
	return state.connection;
};
