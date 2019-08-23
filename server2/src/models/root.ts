import mongoose from 'mongoose';
import counter from 'mongoose-auto-increment';

import { dateString } from '../helpers/date-string';
import logger from '../helpers/logger';
import _  from 'lodash';

import { DB } from '../db';
import { config } from '../config';

let db = new DB();

class RootModel {
	counter: any;
	connection: any;
	Model: any;

	constructor() {
		this.connection = mongoose.createConnection(config.connection_string, {
			useNewUrlParser: true,
			useCreateIndex : true
		}).then(res => {
			this.connection = res;
		});

		// this.connection = db.get();
		this.counter = counter;
		this.counter.initialize(this.connection);
	}

	setModel(name: string, schema: mongoose.Schema) {
		this.Model = mongoose.model(name, schema);
	}

	getModel() {
		return this.Model;
	}

	setCounter(options: any, schema: mongoose.Schema) {
		schema.plugin(this.counter.plugin, {
			model: options.name,
			field: options.field,
			startAt: options.startAt,
			//incrementBy: 1
		});
		this.Model = this.connection.model(options.name, schema);
	}

	// Mongoose Queries
	async find(query={}, project={}, options={}){
		try {
			return await this.Model.find(query, project, options);
		} catch(err) {
			return null;
		}
	}

	async findOne(query={}, project={}) {
		try {
			return await this.Model.findOne(query, project);
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	async save(data={}) {
		try {
			let date     = dateString();
			const newDoc = new this.Model({
				...data,
				date_created : date,
				date_modified: date
			});
			
			return await newDoc.save();
		} catch(err) {
			return null;
		}
	}

	async update(query={}, update:any={}, options={}) {
		try {
			update.date_modified = dateString();
			return await this.Model.update(query, update, options);
		} catch(err) {
			return null;
		}
	}

	async remove(conditions={}) {
		if(_.isEmpty(conditions)) { return null; }

		try {
			return await this.Model.remove(conditions);
		}catch(err) {
			return null;
		}
	}

	async findByIdAndUpdate(id: number, data:any={}, options={new: true}) {
		if(!id) return null;

		try {
			data.date_modified = dateString();
			return await this.Model.findByIdAndUpdate(id, data, options);
		} catch(err) {
			return null;
		}
	}

	async findByIdAndDelete(id: number, options={}) {
		if(!id) return null;

		try {
			return await this.Model.findByIdAndDelete(id, options);
		} catch(err) {
			return null;
		}
	}

	async findOneAndUpdate(query={}, data: any={}, options={}) {
		try {
			data.date_modified = dateString();
			return await this.Model.findOneAndUpdate(query, data, options);
		} catch(err) {
			return null;
		}
	}

	async updateOne(query={}, data: any={}, options={}) {
		try {
			data.date_modified = dateString();
			return await this.Model.updateOne(query, data, options);
		} catch(err) {
			return null;
		}
	}

	async count(query={}) {
		try {
			return await this.Model.countDocuments(query);
		} catch(err) {
			return null;
		}
	}

	async aggregateViaLookup(options: any) {
		try {
			if(_.isEmpty(options)) return null;

			return await this.Model.aggregate.lookup(options);
		} catch(err) {
			return null;
		}
	}
}

export default RootModel;