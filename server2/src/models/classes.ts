import mongoose from 'mongoose';
import Root from './root';
import { config } from '../config';

let Schema   = mongoose.Schema;

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

export default Class.clone();