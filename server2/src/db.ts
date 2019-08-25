import mongoose from 'mongoose';
import { config } from './config';

let state: any= {};

export class DB {

	state: any = {};

	constructor() {}

	connect(done: Function){
		if(state.connection) return done();

		let url = config.connection_string;

		mongoose.createConnection(url, {
			useNewUrlParser: true,
			useCreateIndex : true
		}).then(res => {
			state.connection = res;
			done();
		});
	}

	get(): any{
		return state.connection;
	}
}