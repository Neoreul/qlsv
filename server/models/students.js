let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let Root     = require('./root');
let config   = require('../config');

let studentSchema = new Schema({
	student_number : String,
	first_name     : String,
	last_name      : String,
	email          : String,
	password       : String,
	age            : { type: Number, min: 15, max: 35 },

	class_id       : Number,
	faculty        : String,
	marjor         : String,
	subjects       : { type: Array, default: [] },

	addresses      : { type: Array, default: [] },
	/*
		street_address1: String,
		street_address2: String(Apt, Floor),
		state          : String,
		city           : String,
		zipcode        : String,
		phone          : String
	*/

	status         : String,

	date_created   : String,
	date_modified  : String
}, {
	collection: 'students'
});

class Student extends Root {
	constructor() {
		super();

		let model = "students";
		let counterOptions = {
			name    : model,
			field   : '_id',
			startAt : 1
		};

		this.setCounter(counterOptions, studentSchema);
	}

	static clone() {
		return new Student();
	}
}

module.exports = Student.clone();