let async     = require('async');
let _         = require('lodash');
let validator = require('validator');


let valid     = require('../helpers/valid-input');
let dateString= require('../helpers/date-string');
let hash      = require('../helpers/hash');

// User

exports.registerUser = (req, res, next) => {
	if(req.body) {
		let user = req.body;

		async.parallel([
			cb=>{
				if(_.isEmpty(user.first_name)) {
					cb("First name is required", null);
				} else {
					valid.name(user.first_name) ? cb(null, "ok") : cb("First name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				if(_.isEmpty(user.last_name)) {
					cb("Last name is required", null);
				} else {
					valid.name(user.last_name) ? cb(null, "ok") : cb("Last name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				(!_.isEmpty(user.username)) ? cb(null, "ok") : cb("Username is required", null);
			},
			cb=>{
				if(_.isEmpty(user.email)) {
					cb("Email is required", null);
				} else {
					validator.isEmail(user.email) ? cb(null, "ok") : cb("Your email is invalid", null);
				}
			},
			cb=>{
				if(_.isEmpty(user.password)) {
					cb("Password is required", null);
				} else {
					valid.password(user.password) ? cb(null, "ok") : cb("Password is invalid", null);
				}
			},
			cb=>{
				if(_.isEmpty(user.confirm_password)) {
					cb("Password confirmation is required", null);
				} else {
					if(user.password === user.confirm_password) {
						cb(null, "ok");
					} else {
						cb("Password confirmation is not match your password", null);
					}
				}
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
				});
			} else {
				let ipUser = {
					first_name    : _.trim(user.first_name),
					last_name     : _.trim(user.last_name),
					username      : user.username,
					email         : _.toLower(user.email),
					password      : hash(user.password),
					active        : false,
					registry_date : dateString()
				};

				if(user.phone) {ipUser.phone = user.phone;}

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
};

exports.loginUser = (req, res, next) => {
	if(req.body) {
		let user = req.body;

		async.parallel([
			cb=>{
				(_.isEmpty(user.username)) ? cb("Username is required", null) : cb(null, "ok")
			},
			cb=>{
				if(_.isEmpty(user.password)) {
					cb("Password is required", null);
				} else {
					valid.password(user.password) ? cb(null, "ok") : cb("Password is invalid", null);
				}
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
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
};

// Student

exports.createOrModifyStudent = (req, res, next) => {
	if(req.body) {
		let student = req.body;

		async.parallel([
			cb=>{
				(_.isEmpty(student.student_number)) ? cb("Student number is required", null) : cb(null, "ok");
			},
			cb=>{
				if(_.isEmpty(student.first_name)) {
					cb("First name is required", null);
				} else {
					valid.name(student.first_name) ? cb(null, "ok") : cb("First name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				if(_.isEmpty(student.last_name)) {
					cb("Last name is required", null);
				} else {
					valid.name(student.last_name) ? cb(null, "ok") : cb("Last name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				if(_.isEmpty(student.email)) {
					cb("Email is required", null);
				} else {
					validator.isEmail(student.email) ? cb(null, "ok") : cb("Your email is invalid", null);
				}
			},
			cb=>{
				if(student._id) cb(null, "ok");
				else {
					if(_.isEmpty(student.password)) {
						cb("Password is required", null);
					} else {
						valid.password(student.password) ? cb(null, "ok") : cb("Password is invalid", null);
					}
				}
			},
			cb=>{
				if(student._id) cb(null, "ok");
				else {
					if(_.isEmpty(student.confirm_password)) {
						cb("Password confirmation is required", null);
					} else {
						if(student.password === student.confirm_password) {
							cb(null, "ok");
						} else {
							cb("Password confirmation is not match your password", null);
						}
					}
				}
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
				});
			} else {
				let ipStudent = {
					student_number : student.student_number,
					first_name     : _.trim(student.first_name),
					last_name      : _.trim(student.last_name),
					email          : _.toLower(student.email),
					age            : 15,
					class_id       : null,
					faculty        : "",
					marjor         : "",
					subjects       : [],
					addresses      : [],
					status         : student.status
				};

				if(student.age) { ipStudent.age = student.age; }
				if(student.class_id) { ipStudent.class_id = student.class_id; }
				if(student.faculty) { ipStudent.faculty = student.faculty; }
				if(student.marjor) { ipStudent.marjor = student.marjor; }
				if(student.subjects) { ipStudent.subjects = student.subjects; }

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
};

exports.validateStudentAddress = (req, res, next) => {
	if(req.body.address) {
		let address = req.body.address;

		async.parallel([
			cb=>{
				(_.isEmpty(address.street_address1)) ? cb("Street address is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(address.state)) ? cb("State is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(address.city)) ? cb("City is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(address.zipcode)) ? cb("Zipcode is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(address.phone)) ? cb("Phone number is required", null) : cb(null, "ok");
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
				});
			} else {
				let ipAddress = {
					street_address1: address.street_address1,
					state          : address.state,
					city           : address.city,
					zipcode        : address.zipcode,
					phone          : address.phone
				};

				if(address.street_address2) { ipAddress.street_address2 = address.street_address2; }

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
};

// Teacher
exports.createOrModifyTeacher = (req, res, next) => {
	if(req.body) {
		let teacher = req.body;

		async.parallel([
			cb=>{
				(_.isEmpty(teacher.student_number)) ? cb("Teacher number is required", null) : cb(null, "ok");
			},
			cb=>{
				if(_.isEmpty(teacher.first_name)) {
					cb("First name is required", null);
				} else {
					valid.name(teacher.first_name) ? cb(null, "ok") : cb("First name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				if(_.isEmpty(teacher.last_name)) {
					cb("Last name is required", null);
				} else {
					valid.name(teacher.last_name) ? cb(null, "ok") : cb("Last name must be between 1 and 15 characters", null);
				}
			},
			cb=>{
				if(_.isEmpty(teacher.email)) {
					cb("Email is required", null);
				} else {
					validator.isEmail(teacher.email) ? cb(null, "ok") : cb("Your email is invalid", null);
				}
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
				});
			} else {
				let ipTeacher = {
					teacher_number : teacher.teacher_number,
					first_name     : _.trim(teacher.first_name),
					last_name      : _.trim(teacher.last_name),
					email          : _.toLower(teacher.email),

					age            : "",
					faculty        : "",
					marjor         : "",
					subjects       : [],

					special_name   : "",
					street_address1: "",
					street_address2: "",
					state          : "",
					city           : "",
					zipcode        : "",
					phone          : "",
					status         : ""
				};

				if(teacher.age) { ipTeacher.age = teacher.age; }
				if(teacher.faculty) { ipTeacher.faculty = teacher.faculty; }
				if(teacher.marjor) { ipTeacher.marjor = teacher.marjor; }
				if(teacher.subjects) { ipTeacher.subjects = teacher.subjects; }
				if(teacher.status) { ipTeacher.status = teacher.status; }

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
};

// Class
exports.createOrModifyClass = (req, res, next) => {
	if(req.body) {
		let data = req.body;

		async.parallel([
			cb=>{
				(_.isEmpty(data.class_number)) ? cb("Class number is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.name)) ? cb("Class name is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.homeroom_teacher)) ? cb("Homeroom Teacher is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.started_year)) ? cb("Start year is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.ended_year)) ? cb("End year is required", null) : cb(null, "ok");
			},
			cb=>{
				if(!_.isEmpty(data.started_year) && !_.isEmpty(data.ended_year)) {
					let started_year = Number(data.started_year);
					let ended_year   = Number(data.ended_year);

					if(started_year >= ended_year) {
						cb("Start year can not greater than end year", null);
					} else {
						cb(null, "ok");
					}
				}
			},
			cb=>{
				(_.isEmpty(data.status)) ? cb("Status is required", null) : cb(null, "ok");
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
				});
			} else {
				let ipClass = {
					class_number    : _.trim(data.class_number),
					name            : _.trim(data.name),
					homeroom_teacher: data.homeroom_teacher,
					started_year    : data.started_year,
					ended_year      : data.ended_year,
					status          : data.status,
					description     : "",
					events          : []
				};

				if(data.description) { ipClass.description = data.description; }
				if(data.events) { ipClass.events = data.events; }

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
};

// Subject
exports.createOrModifySubject = (req, res, next) => {
	if(req.body) {
		let data = req.body;

		async.parallel([
			cb=>{
				(_.isEmpty(data.subject_number)) ? cb("Subject number is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.name)) ? cb("Subject name is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.started_year)) ? cb("Start year is required", null) : cb(null, "ok");
			},
			cb=>{
				(_.isEmpty(data.ended_year)) ? cb("End year is required", null) : cb(null, "ok");
			},
			cb=>{
				if(!_.isEmpty(data.started_year) && !_.isEmpty(data.ended_year)) {
					let started_year = Number(data.started_year);
					let ended_year   = Number(data.ended_year);

					if(started_year >= ended_year) {
						cb("Start year can not greater than end year", null);
					} else {
						cb(null, "ok");
					}
				}
			},
			cb=>{
				(_.isEmpty(data.status)) ? cb("Status is required", null) : cb(null, "ok");
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
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
};

exports.changePassword = (req, res, next) => {
	if(req.body) {
		let data = req.body;

		async.parallel([
			cb=>{
				if(_.isEmpty(data.password)) {
					cb("Password is required", null);
				} else {
					valid.password(data.password) ? cb(null, "ok") : cb("Password is invalid", null);
				}
			},
			cb=>{
				if(_.isEmpty(data.confirm_password)) {
					cb("Password confirmation is required", null);
				} else {
					if(data.password === data.confirm_password) {
						cb(null, "ok");
					} else {
						cb("Password confirmation is not match your password", null);
					}
				}
			}
		], (err, result) => {
			if(err) {
				res.send({
					err: 1,
					msg: err
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
};