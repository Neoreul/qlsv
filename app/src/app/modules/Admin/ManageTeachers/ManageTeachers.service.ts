import { Injectable } from '@angular/core';

import { RestfulAPI } from '../../Utils/restfulAPI';
import { AppConfig } from '../../../config/index';
import { TeacherAPI } from './ManageTeachers.api';

@Injectable()
export class TeacherService {

	constructor(
		private resfulAPI: RestfulAPI) {}

	getAll(): Promise<any>{
		let url = TeacherAPI.GET_TEACHERS;
		return this.resfulAPI.post(url);
	}

	get(id: number): Promise<any>{
		let url = TeacherAPI.GET_TEACHER;
		return this.resfulAPI.post(url, { id });
	}

	createOrModify(data: any): Promise<any>{
		let url = TeacherAPI.CREATE_OR_MODIFY;
		return this.resfulAPI.post(url, data);
	}

	remove(id: number): Promise<any>{
		let url = TeacherAPI.REMOVE_TEACHER;
		return this.resfulAPI.post(url, { id });
	}
}