let RootRouter     = require('../helpers/root-router');

let Student        = require('../models/students');

let validInputUser = require('../middlewares/valid-user-input');

class StudentRouter extends RootRouter {
	constructor() {
		super();

		this.router.post("/api/students", this.handleGetStudents.bind(this));
		this.router.post("/api/students/find", this.handleGetStudent.bind(this));
		this.router.post("/api/students/create-or-modify", validInputUser.createOrModifyStudent, this.handleStudentCreateOrModify.bind(this));
		this.router.post("/api/students/change-password", validInputUser.changePassword, this.handleStudentChangePassword.bind(this));
		this.router.post("/api/students/addresses", this.handleStudentGetAddresses.bind(this));
		this.router.post("/api/students/add-address", validInputUser.validateStudentAddress, this.handleStudentAddAddress.bind(this));
		this.router.post("/api/students/update-address", validInputUser.validateStudentAddress, this.handleStudentUpdateAddress.bind(this));
		this.router.post("/api/students/remove-address", this.handleStudentRemoveAddress.bind(this));
		this.router.post("/api/students/remove", this.handleRemoveStudent.bind(this));
		this.router.post("/api/students/change-status", this.handleChangeStatus.bind(this));

		return this.router;
	}

	async handleGetStudents(req, res) {
		try {

			let skip, limit, keyword, class_id, subject_id, query = {};

			skip       = Number(req.body.skip)       || 0;
			limit      = Number(req.body.limit)      || 0;
			class_id   = Number(req.body.class_id)   || "";
			subject_id = Number(req.body.subject_id) || "";
			keyword    = req.body.keyword;

			if(keyword && keyword != "") {
				query = {
					$or: [
						{ student_number: { $regex: keyword, $options: 'i' } },
						{ first_name    : { $regex: keyword, $options: 'i' } },
						{ last_name     : { $regex: keyword, $options: 'i' } },
						{ email         : { $regex: keyword, $options: 'i' } }
					]
				};
			}

			if(class_id != "") {
				query.class_id = class_id;
			}

			if(subject_id != "") {
				query.subjects = subject_id;
			}

			let docs  = await Student.find(query, {
				student_number : 1,
				first_name     : 1,
				last_name      : 1,
				email          : 1,
				status         : 1,
				date_modified  : 1
			}, {skip, limit});
			let count =await Student.count(query);

			res.send({
				students: docs,
				count,
				limit   : limit,
				skip    : skip
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleGetStudent(req, res) {
		try {

			let student_id = Number(req.body.id);
			let doc        = await Student.findOne({_id: student_id});

			if(!doc) {
				res.send({
					err: 1,
					msg: "Can not find this student"
				});
				return;
			}

			res.send(doc);

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentCreateOrModify(req, res) {
		try {

			let isEditMode = (req.body._id && !isNaN(Number(req.body._id))) ? true : false;

			// Mofidy the student
			if(isEditMode) {
				let doc = await Student.findOne({
					_id: { $ne: Number(req.body._id) },
					student_number: req.ipStudent.student_number
				});

				if(doc) {
					res.send({
						err: 1,
						msg: "This Student number is already used"
					});
					return;
				}

				let updateRecord = await Student.updateOne({
					_id: Number(req.body._id)
				}, {
					$set: req.ipStudent
				});

				if(!updateRecord) {
					res.send({
						err: 1,
						msg: "Can not update this student"
					});
					return;
				}

				res.send({ ok: 1 });

			} else {
				// Create a new student

				let doc = await Student.findOne({student_number: req.ipStudent.student_number});
				if(doc) {
					res.send({
						err: 1,
						msg: "This Student number is already used"
					});
					return;
				}

				let newRecord = await Student.save(req.ipStudent);
				
				if(!newRecord) {
					res.send({
						err: 1,
						msg: "Can not create this student"
					});
					return;
				}

				res.send({
					ok: 1,
					student_id: newRecord._id
				});
			}

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentChangePassword(req, res) {
		try {
			let student_id = Number(req.body.id);

			let doc = await Student.find({
				_id: student_id,
				password: req.ipPwd.password
			});

			if(doc) {
				res.send({
					err: 1,
					msg: "This password has been using"
				});
				return;
			}

			let updateRecord = await Student.updateOne({
				_id: student_id
			}, {
				$set: req.ipPwd
			});

			if(!updateRecord) {
				res.send({
					err: 1,
					msg: "Can not change the password of the student",
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentGetAddresses(req, res) {
		try {

			let student_id = Number(req.body.id);

			let doc = await Student.findOne({_id: student_id}, {
				student_number: 1,
				first_name    : 1,
				last_name     : 1,
				email         : 1,
				status        : 1,

				addresses     : 1
			});

			let addresses = [];
			if(doc) { addresses = doc.addresses; }

			res.send({
				ok: 1,
				addresses
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentAddAddress(req, res) {
		try {
			let student_id = Number(req.body.id);

			let doc = await Student.findOne({
				_id: student_id
			}, {
				addresses: 1
			});

			req.ipAddress.id = doc.addresses.length + 1;

			let updateRecord = await Student.updateOne({
				_id: student_id
			}, {
				$push: { addresses: req.ipAddress }
			});

			if(!updateRecord) {
				res.send({
					err: 1,
					msg: "Can not add address"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentUpdateAddress(req, res) {
		try {

			let student_id = Number(req.body.id);
			let address_id = Number(req.body.address.id);

			req.ipAddress.id = address_id;
			
			let updateRecord = await Student.updateOne({
				_id: student_id,
				"addresses.id": address_id
			}, {
				$set: {
					'addresses.$': req.ipAddress
				}
			});

			if(!updateRecord) {
				res.send({
					err: 1,
					msg: "Can not update address"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleStudentRemoveAddress(req, res) {
		try {

			let student_id    = Number(req.body.id);
			
			let updateRecord = await Student.updateOne({
				_id: student_id
			}, {
				$pull: {
					addresses: {
						id: Number(req.body.address.id)
					}
				}
			});

			if(!updateRecord) {
				res.send({
					err: 1,
					msg: "Can not remove address"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleRemoveStudent(req, res) {
		try {

			let student_id = Number(req.body.id);

			let removeRecord = await Student.remove({ _id: student_id });

			if(!removeRecord) {
				res.send({
					err: 1,
					msg: "Can not remove this student"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleChangeStatus(req, res) {
		try {

			let student_id = Number(req.body.id);

			let updateRecord = await Student.updateOne({ _id: student_id }, {
				$set: { status: req.body.status }
			});

			if(!updateRecord) {
				res.send({
					err: 1,
					msg: "Can not change status of this student"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	static clone() {
		return new StudentRouter();
	}
}

module.exports = StudentRouter.clone();