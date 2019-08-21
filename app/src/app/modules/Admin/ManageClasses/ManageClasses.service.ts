import { Injectable } from '@angular/core';

import { RestfulAPI } from '../../Utils/restfulAPI';
import { AppConfig } from '../../../config/index';
import { ClassAPI } from './ManageClasses.api';

@Injectable()
export class ClassService {

	constructor(
		private resfulAPI: RestfulAPI) {}

	getAll(): Promise<any>{
		let url = ClassAPI.GET_CLASSES;
		return this.resfulAPI.post(url);
	}

	get(id: number): Promise<any>{
		let url = ClassAPI.GET_CLASS;
		return this.resfulAPI.post(url, { id });
	}

	createOrModify(data: any): Promise<any>{
		let url = ClassAPI.CREATE_OR_MODIFY;
		return this.resfulAPI.post(url, data);
	}

	remove(id: number): Promise<any>{
		let url = ClassAPI.REMOVE_CLASS;
		return this.resfulAPI.post(url, { id });
	}
}