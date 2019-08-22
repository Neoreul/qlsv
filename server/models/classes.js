let mongoose = require('mongoose');
let Schema   = mongoose.Schema;
let Root     = require('./root');
let config   = require('../config');

let classSchema = new Schema({
	class_number  : String,
	name          : String,
	homeroom_teacher: Number,
	started_year  : String,
	ended_year    : String,
	
	description   : String,
	events        : { type: Array, default: [] },

	status        : String,

	date_created  : String,
	date_modified : String
}, {
	collection: 'classes'
});

class Class extends Root {
	constructor() {
		super();

		let model = "classes";
		let counterOptions = {
			name    : model,
			field   : '_id',
			startAt : 1
		};

		this.setCounter(counterOptions, classSchema);
	}

	static clone() {
		return new Class();
	}
}

module.exports = Class.clone();