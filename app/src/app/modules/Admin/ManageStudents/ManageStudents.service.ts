import { Injectable } from '@angular/core';

import { RestfulAPI } from '../../Utils/restfulAPI';
import { AppConfig }  from '../../../config/index';
import { StudentAPI } from './ManageStudents.api';

@Injectable()
export class StudentService {

	constructor(
		private resfulAPI: RestfulAPI) {}

	getAll(): Promise<any>{
		let url = StudentAPI.GET_STUDENTS;
		return this.resfulAPI.post(url);
	}

	get(id: number): Promise<any>{
		let url = StudentAPI.GET_STUDENT;
		return this.resfulAPI.post(url, { id });
	}

	createOrModify(data: any): Promise<any>{
		let url = StudentAPI.CREATE_OR_MODIFY;
		return this.resfulAPI.post(url, data);
	}

	remove(id: number): Promise<any>{
		let url = StudentAPI.REMOVE_STUDENT;
		return this.resfulAPI.post(url, { id });
	}

	changePassword(data: Object): Promise<any>{
		let url = StudentAPI.CHANGE_PASSWORD;
		return this.resfulAPI.post(url, data);
	}

	getAddresses(id: number): Promise<any>{
		let url = StudentAPI.GET_ADDRESSES;
		return this.resfulAPI.post(url, { id });
	}

	// id: student_id
	addAddress(id: number, address: Object): Promise<any>{
		let url = StudentAPI.ADD_ADDRESS;
		return this.resfulAPI.post(url, { id, address });
	}

	updateAddress(id: number, address: Object): Promise<any>{
		let url = StudentAPI.UPDATE_ADDRESS;
		return this.resfulAPI.post(url, { id, address });
	}

	removeAddress(id: number, address: Object): Promise<any>{
		let url = StudentAPI.REMOVE_ADDRESS;
		return this.resfulAPI.post(url, { id, address });
	}
}