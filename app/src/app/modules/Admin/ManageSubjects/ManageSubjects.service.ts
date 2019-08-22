import { Injectable } from '@angular/core';

import { RestfulAPI } from '../../Utils/restfulAPI';
import { AppConfig } from '../../../config/index';
import { SubjectAPI } from './ManageSubjects.api';

@Injectable()
export class SubjectService {

	constructor(
		private resfulAPI: RestfulAPI) {}

	getAll(): Promise<any>{
		let url = SubjectAPI.GET_SUBJECTS;
		return this.resfulAPI.post(url);
	}

	get(id: number): Promise<any>{
		let url = SubjectAPI.GET_SUBJECT;
		return this.resfulAPI.post(url, { id });
	}

	createOrModify(data: any): Promise<any>{
		let url = SubjectAPI.CREATE_OR_MODIFY;
		return this.resfulAPI.post(url, data);
	}

	remove(id: number): Promise<any>{
		let url = SubjectAPI.REMOVE_SUBJECT;
		return this.resfulAPI.post(url, { id });
	}
}