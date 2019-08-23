import mongoose from 'mongoose';
import Root from './root';
import { config } from '../config';

let Schema   = mongoose.Schema;

let subjectSchema = new Schema({
	subject_number: String,
	name          : String,
	description   : String,
	started_year  : String,
	ended_year    : String,

	status        : String,

	date_created  : String,
	date_modified : String
}, {
	collection: 'subjects'
});

class Subject extends Root {
	constructor() {
		super();

		let model = "subjects";
		let counterOptions = {
			name    : model,
			field   : '_id',
			startAt : 1
		};

		this.setCounter(counterOptions, subjectSchema);
	}

	static clone() {
		return new Subject();
	}
}

export default Subject.clone();