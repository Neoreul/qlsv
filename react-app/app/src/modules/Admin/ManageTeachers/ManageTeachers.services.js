import { POST } from '../../Utils/restfulAPI';
import { TeacherAPI } from './ManageTeachers.api';

export const getTeachers = () => {
	return POST(TeacherAPI.GET_TEACHERS);
}

export const getTeacher = (id) => {
	return POST(TeacherAPI.GET_TEACHER, { id });
}

export const createOrModifyTeacher = (data) => {
	return POST(TeacherAPI.CREATE_OR_MODIFY, data);
}

export const removeTeacher = (id) => {
	return POST(TeacherAPI.REMOVE_TEACHER, { id });
}