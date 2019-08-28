import { POST } from '../../Utils/restfulAPI';
import { SubjectAPI } from './ManageSubjects.api';

export const getSubjects = () => {
	return POST(SubjectAPI.GET_SUBJECTS);
}

export const getSubject = (id) => {
	return POST(SubjectAPI.GET_SUBJECT, { id });
}

export const createOrModifySubject = (data) => {
	return POST(SubjectAPI.CREATE_OR_MODIFY, data);
}

export const removeSubject = (id) => {
	return POST(SubjectAPI.REMOVE_SUBJECT, { id });
}