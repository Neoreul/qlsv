import async  from 'async';
import _ from 'lodash';
import validator from 'validator'


import ValidInput from '../helpers/valid-input';
import { dateString } from '../helpers/date-string';
import { hash } from '../helpers/hash';

let valid = new ValidInput();

class ValidUserInput {

	constructor() {}

	// User
	registerUser(req: any, res: any, next: any){
		if(req.body) {
			let user = req.body;

			async.parallel([
				cb=>{
					if(_.isEmpty(user.first_name)) {
						cb(new Error("First name is required"), null);
					} else {
						valid.name(user.first_name) ? cb(null, "ok") : cb(new Error("First name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					if(_.isEmpty(user.last_name)) {
						cb(new Error("Last name is required"), null);
					} else {
						valid.name(user.last_name) ? cb(null, "ok") : cb(new Error("Last name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					(!_.isEmpty(user.username)) ? cb(null, "ok") : cb(new Error("Username is required"), null);
				},
				cb=>{
					if(_.isEmpty(user.email)) {
						cb(new Error("Email is required"), null);
					} else {
						validator.isEmail(user.email) ? cb(null, "ok") : cb(new Error("Your email is invalid"), null);
					}
				},
				cb=>{
					if(_.isEmpty(user.password)) {
						cb(new Error("Password is required"), null);
					} else {
						valid.password(user.password) ? cb(null, "ok") : cb(new Error("Password is invalid"), null);
					}
				},
				cb=>{
					if(_.isEmpty(user.confirm_password)) {
						cb(new Error("Password confirmation is required"), null);
					} else {
						if(user.password === user.confirm_password) {
							cb(null, "ok");
						} else {
							cb(new Error("Password confirmation is not match your password"), null);
						}
					}
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipUser = {
						first_name    : _.trim(user.first_name),
						last_name     : _.trim(user.last_name),
						username      : user.username,
						email         : _.toLower(user.email),
						password      : hash(user.password),
						active        : false,
						registry_date : dateString(),
						phone         : user.phone
					};

					req.ipUser = ipUser;
					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	loginUser(req: any, res: any, next: any){
		if(req.body) {
			let user = req.body;

			async.parallel([
				cb=>{
					(_.isEmpty(user.username)) ? cb(new Error("Username is required"), null) : cb(null, "ok")
				},
				cb=>{
					if(_.isEmpty(user.password)) {
						cb(new Error("Password is required"), null);
					} else {
						valid.password(user.password) ? cb(null, "ok") : cb(new Error("Password is invalid"), null);
					}
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipUser = {
						username : user.username,
						password : hash(user.password),
					};

					req.ipUser = ipUser;

					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	// Student
	createOrModifyStudent(req: any, res: any, next: any){
		if(req.body) {
			let student = req.body;

			async.parallel([
				cb=>{
					(_.isEmpty(student.student_number)) ? cb(new Error("Student number is required"), null) : cb(null, "ok");
				},
				cb=>{
					if(_.isEmpty(student.first_name)) {
						cb(new Error("First name is required"), null);
					} else {
						valid.name(student.first_name) ? cb(null, "ok") : cb(new Error("First name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					if(_.isEmpty(student.last_name)) {
						cb(new Error("Last name is required"), null);
					} else {
						valid.name(student.last_name) ? cb(null, "ok") : cb(new Error("Last name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					if(_.isEmpty(student.email)) {
						cb(new Error("Email is required"), null);
					} else {
						validator.isEmail(student.email) ? cb(null, "ok") : cb(new Error("Your email is invalid"), null);
					}
				},
				cb=>{
					if(student._id) cb(null, "ok");
					else {
						if(_.isEmpty(student.password)) {
							cb(new Error("Password is required"), null);
						} else {
							valid.password(student.password) ? cb(null, "ok") : cb(new Error("Password is invalid"), null);
						}
					}
				},
				cb=>{
					if(student._id) cb(null, "ok");
					else {
						if(_.isEmpty(student.confirm_password)) {
							cb(new Error("Password confirmation is required"), null);
						} else {
							if(student.password === student.confirm_password) {
								cb(null, "ok");
							} else {
								cb(new Error("Password confirmation is not match your password"), null);
							}
						}
					}
				},
				cb=>{
					(_.isEmpty(student.status)) ? cb(new Error("Status is required"), null) : cb(null, "ok");
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipStudent = {
						student_number : student.student_number,
						first_name     : _.trim(student.first_name),
						last_name      : _.trim(student.last_name),
						email          : _.toLower(student.email),
						age            : 15,
						class_id       : student.class_id,
						faculty        : student.faculty,
						marjor         : student.marjor,
						subjects       : student.subjects,
						addresses      : student.addresses,
						status         : student.status
					};

					if(!student._id) {
						student.password = hash(student.password);
					}

					req.ipStudent = ipStudent;
					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	validateStudentAddress(req: any, res: any, next: any){
		if(req.body.address) {
			let address = req.body.address;

			async.parallel([
				cb=>{
					(_.isEmpty(address.street_address1)) ? cb(new Error("Street address is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(address.state)) ? cb(new Error("State is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(address.city)) ? cb(new Error("City is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(address.zipcode)) ? cb(new Error("Zipcode is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(address.phone)) ? cb(new Error("Phone number is required"), null) : cb(null, "ok");
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipAddress = {
						street_address1: address.street_address1,
						street_address2: address.street_address2,
						state          : address.state,
						city           : address.city,
						zipcode        : address.zipcode,
						phone          : address.phone
					};

					req.ipAddress = ipAddress;
					next();
				}
			});
		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	// Teacher
	createOrModifyTeacher(req: any, res: any, next: any){
		if(req.body) {
			let teacher = req.body;

			async.parallel([
				cb=>{
					(_.isEmpty(teacher.teacher_number)) ? cb(new Error("Teacher number is required"), null) : cb(null, "ok");
				},
				cb=>{
					if(_.isEmpty(teacher.first_name)) {
						cb(new Error("First name is required"), null);
					} else {
						valid.name(teacher.first_name) ? cb(null, "ok") : cb(new Error("First name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					if(_.isEmpty(teacher.last_name)) {
						cb(new Error("Last name is required"), null);
					} else {
						valid.name(teacher.last_name) ? cb(null, "ok") : cb(new Error("Last name must be between 1 and 15 characters"), null);
					}
				},
				cb=>{
					if(_.isEmpty(teacher.email)) {
						cb(new Error("Email is required"), null);
					} else {
						validator.isEmail(teacher.email) ? cb(null, "ok") : cb(new Error("Your email is invalid"), null);
					}
				},
				cb=>{
					(_.isEmpty(teacher.status)) ? cb(new Error("Status is required"), null) : cb(null, "ok");
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipTeacher = {
						teacher_number : teacher.teacher_number,
						first_name     : _.trim(teacher.first_name),
						last_name      : _.trim(teacher.last_name),
						email          : _.toLower(teacher.email),

						age            : 26,
						faculty        : teacher.faculty,
						marjor         : teacher.marjor,
						subjects       : teacher.subjects,

						special_name   : "",
						street_address1: "",
						street_address2: "",
						state          : "",
						city           : "",
						zipcode        : "",
						phone          : "",
						status         : teacher.status
					};

					if(teacher.special_name) { ipTeacher.special_name = teacher.special_name; }
					if(teacher.street_address1) { ipTeacher.street_address1 = teacher.street_address1; }
					if(teacher.street_address2) { ipTeacher.street_address2 = teacher.street_address2; }
					if(teacher.state) { ipTeacher.state = teacher.state; }
					if(teacher.city) { ipTeacher.city = teacher.city; }
					if(teacher.zipcode) { ipTeacher.zipcode = teacher.zipcode; }
					if(req.body.phone) { ipTeacher.phone = teacher.phone; }

					req.ipTeacher = ipTeacher;

					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	// Class
	createOrModifyClass(req: any, res: any, next: any){
		if(req.body) {
			let data = req.body;

			async.parallel([
				cb=>{
					(_.isEmpty(data.class_number)) ? cb(new Error("Class number is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.name)) ? cb(new Error("Class name is required"), null) : cb(null, "ok");
				},
				cb=>{
					(isNaN(Number(data.homeroom_teacher))) ? cb(new Error("Homeroom Teacher is invalid"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.started_year)) ? cb(new Error("Start year is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.ended_year)) ? cb(new Error("End year is required"), null) : cb(null, "ok");
				},
				cb=>{
					if(!_.isEmpty(data.started_year) && !_.isEmpty(data.ended_year)) {
						let started_year = Number(data.started_year);
						let ended_year   = Number(data.ended_year);

						if(started_year >= ended_year) {
							cb(new Error("Start year can not greater than end year"), null);
						} else {
							cb(null, "ok");
						}
					}
				},
				cb=>{
					(_.isEmpty(data.status)) ? cb(new Error("Status is required"), null) : cb(null, "ok");
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipClass = {
						class_number    : _.trim(data.class_number),
						name            : _.trim(data.name),
						homeroom_teacher: Number(data.homeroom_teacher),
						started_year    : data.started_year,
						ended_year      : data.ended_year,
						status          : data.status,
						description     : "",
						events          : data.events
					};

					if(data.description) { ipClass.description = data.description; }

					req.ipClass = ipClass;
					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	// Subject
	createOrModifySubject(req: any, res: any, next: any){
		if(req.body) {
			let data = req.body;

			async.parallel([
				cb=>{
					(_.isEmpty(data.subject_number)) ? cb(new Error("Subject number is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.name)) ? cb(new Error("Subject name is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.started_year)) ? cb(new Error("Start year is required"), null) : cb(null, "ok");
				},
				cb=>{
					(_.isEmpty(data.ended_year)) ? cb(new Error("End year is required"), null) : cb(null, "ok");
				},
				cb=>{
					if(!_.isEmpty(data.started_year) && !_.isEmpty(data.ended_year)) {
						let started_year = Number(data.started_year);
						let ended_year   = Number(data.ended_year);

						if(started_year >= ended_year) {
							cb(new Error("Start year can not greater than end year"), null);
						} else {
							cb(null, "ok");
						}
					}
				},
				cb=>{
					(_.isEmpty(data.status)) ? cb(new Error("Status is required"), null) : cb(null, "ok");
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipSubject = {
						subject_number  : _.trim(data.subject_number),
						name            : _.trim(data.name),
						started_year    : data.started_year,
						ended_year      : data.ended_year,
						description     : "",
						status          : data.status
					};

					if(data.description) { ipSubject.description = data.description; }

					req.ipSubject = ipSubject;
					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}

	changePassword(req: any, res: any, next: any){
		if(req.body) {
			let data = req.body;

			async.parallel([
				cb=>{
					if(_.isEmpty(data.password)) {
						cb(new Error("Password is required"), null);
					} else {
						valid.password(data.password) ? cb(null, "ok") : cb(new Error("Password is invalid"), null);
					}
				},
				cb=>{
					if(_.isEmpty(data.confirm_password)) {
						cb(new Error("Password confirmation is required"), null);
					} else {
						if(data.password === data.confirm_password) {
							cb(null, "ok");
						} else {
							cb(new Error("Password confirmation is not match your password"), null);
						}
					}
				}
			], (err, result) => {
				if(err) {
					res.send({
						err: 1,
						msg: err.message
					});
				} else {
					let ipPwd = {
						password: hash(data.password)
					};

					req.ipPwd = ipPwd;
					next();
				}
			});

		} else {
			res.status(400).send({
				err: 1,
				msg: "Not input data"
			});
		}
	}
}

export default ValidUserInput;