let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let Root     = require('./root');
let config   = require('../config');

let userSchema = new Schema({
	username      : { type: String, unique: true },
	password      : String,
	first_name    : String,
	last_name     : String,
	email         : String,
	phone         : String,
	registry_date : String,

	active        : { type: String, default: "false" },

	date_created  : String,
	date_modified : String
}, {
	collection: 'users'
});

class User extends Root {
	constructor() {
		super();

		let model = "users";
		let counterOptions = {
			name    : model,
			field   : '_id',
			startAt : 1
		};

		this.setCounter(counterOptions, userSchema);
	}

	static clone() {
		return new User();
	}
}

module.exports = User.clone();