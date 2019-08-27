import { POST } from '../../Utils/restfulAPI';
import { ClassAPI } from './ManageClasses.api';

export const getClasses = () => {
	return POST(ClassAPI.GET_CLASSES);
}

export const getClass = (id) => {
	return POST(ClassAPI.GET_CLASS, { id });
}

export const createOrModifyClass = (data) => {
	return POST(ClassAPI.CREATE_OR_MODIFY, data);
}

export const removeClass = (id) => {
	return POST(ClassAPI.REMOVE_CLASS, { id });
}