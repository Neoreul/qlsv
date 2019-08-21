let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let Root     = require('./root');
let config   = require('../config');

let teacherSchema = new Schema({
	teacher_number : String,
	first_name     : String,
	last_name      : String,
	age            : { type: Number, min: 23, max: 55 },
	email          : String,

	faculty        : String,
	marjor         : String,
	subjects       : { type: Array, default: [] },

	special_name   : String,
	street_address1: String,
	street_address2: String,
	state          : String,
	city           : String,
	zipcode        : String,
	phone          : String,

	status         : String,

	date_created   : String,
	date_modified  : String
}, {
	collection: 'teachers'
});

class Teacher extends Root {
	constructor() {
		super();

		let model = "teachers";
		let counterOptions = {
			name    : model,
			field   : '_id',
			startAt : 1
		};

		this.setCounter(counterOptions, teacherSchema);
	}

	static clone() {
		return new Teacher();
	}
}

module.exports = Teacher.clone();