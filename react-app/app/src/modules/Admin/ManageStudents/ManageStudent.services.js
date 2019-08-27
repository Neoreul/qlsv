import { POST } from '../../Utils/restfulAPI';
import { StudentAPI } from './ManageStudent.api';

export const getStudents = (data) => {
	return POST(StudentAPI.GET_STUDENTS, data);
};

export const getStudent = (id) => {
	return POST(StudentAPI.GET_STUDENT, { id });
};

export const createOrModifyStudent = (data) => {
	return POST(StudentAPI.CREATE_OR_MODIFY, data);
};

export const removeStudent = (id) => {
	return POST(StudentAPI.REMOVE_STUDENT, { id });
};

export const changeStudentPassword = (data) => {
	return POST(StudentAPI.CHANGE_PASSWORD, data);
};

export const getStudentAddresses = (id) => {
	return POST(StudentAPI.GET_ADDRESSES, { id });
};

export const addStudentAddress = (id, address) => {
	return POST(StudentAPI.ADD_ADDRESS, { id, address });
};

export const updateStudentAddress = (id, address) => {
	return POST(StudentAPI.UPDATE_ADDRESS, { id, address });
};

export const removeStudentAddress = (id, address) => {
	return POST(StudentAPI.REMOVE_ADDRESS, { id, address });
};

export const changeStudentStatus = (id, status) => {
	return POST(StudentAPI.CHANGE_STATUS, { id, status });
};