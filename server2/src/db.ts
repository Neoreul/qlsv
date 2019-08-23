import mongoose from 'mongoose';
import { config } from './config';

export class DB {

	state: any = {};

	constructor() {}

	connect(done: Function){
		if(this.state.connection) return done();

		let url = config.connection_string;

		mongoose.createConnection(url, {
			useNewUrlParser: true,
			useCreateIndex : true
		}).then(res => {
			this.state.connection = res;
			done();
		});
	}

	get(): any{
		return this.state.connection;
	}
}