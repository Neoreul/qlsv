let mongoose   = require('mongoose');
let counter    = require('mongoose-auto-increment');
let db         = require('../db');
let dateString = require('../helpers/date-string');
let _          = require('lodash');

class RootModel {
	constructor() {
		let connection = mongoose.createConnection(require('../config').connection_string, {
			useNewUrlParser: true,
			useCreateIndex: true
		}, (err) => {
			if(err) {
				console.log('Cannot connect to DB');
			}
		});

		this.counter = counter;
		this.counter.initialize(connection);
		this.connection = connection;
	}

	setModel(name, schema) {
		this.Model = mongoose.model(name, schema);
	}

	getModel() {
		return this.Model;
	}

	setCounter(options, schema) {
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
			return null;
		}
	}

	async save(data) {
		try {
			let date     = dateString();
			const newDoc = new this.Model({
				...data,
				date_created : date,
				date_modified: date
			});
			
			return await newDoc.save();
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	async update(query={}, update={}, options={}) {
		try {
			update.date_modified = dateString();
			return await this.Model.update(query, update, options);
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	async remove(conditions={}) {
		if(_.isEmpty(conditions)) { return null; }

		try {
			return await this.Model.remove(conditions);
		}catch(err) {
			console.log(err);
			return null;
		}
	}

	async findByIdAndUpdate(id, data={}, options={new: true}) {
		if(!id) return null;

		try {
			data.date_modified = dateString();
			return await this.Model.findByIdAndUpdate(id, data, options);
		} catch(err) {
			return null;
		}
	}

	async findByIdAndDelete(id, options={}) {
		if(!id) return null;

		try {
			return await this.Model.findByIdAndDelete(id, options);
		} catch(err) {
			return null;
		}
	}

	async findOneAndUpdate(query={}, data={}, options={}) {
		try {
			data.date_modified = dateString();
			return await this.Model.findOneAndUpdate(query, data, options);
		} catch(err) {
			return null;
		}
	}

	async updateOne(query={}, data={}, options={}) {
		try {
			data.date_modified = dateString();
			return await this.Model.updateOne(query, data, options);
		} catch(err) {
			console.log(err);
			return null;
		}
	}

	async count() {
		try {
			return await this.Model.countDocuments();
		} catch(err) {
			return null;
		}
	}

	async aggregateViaLookup(options) {
		try {
			if(_.isEmpty(options)) return null;

			return await this.Model.aggregate.lookup(options);
		} catch(err) {
			console.log(err);
			return null;
		}
	}
}

module.exports = RootModel;