import RootRouter from '../helpers/root-router';

import Teacher from '../models/teachers';

import Auth from '../middlewares/auth';
import ValidUserInput from '../middlewares/valid-user-input';

let validUserInput = new ValidUserInput();
let auth = new Auth();

class TeacherRouter extends RootRouter {
	constructor() {
		super();

		this.router.post("/api/teachers", this.handleGetTeachers.bind(this));
		this.router.post("/api/teachers/find", this.handleGetTeacher.bind(this));
		this.router.post("/api/teachers/create-or-modify", validUserInput.createOrModifyTeacher, this.handleTeacherCreateOrModify.bind(this));
		this.router.post("/api/teachers/remove", this.handleRemoveTeacher.bind(this));

		return this.router;
	}

	async handleGetTeachers(req: any, res: any) {
		try {

			let docs  = await Teacher.find({}, {
				teacher_number : 1,
				first_name     : 1,
				last_name      : 1,
				email          : 1,
				status         : 1,
				date_modified  : 1
			});

			res.send({
				teachers: docs
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleGetTeacher(req: any, res: any) {
		try {

			let teacher_id = Number(req.body.id);

			let doc = await Teacher.findOne({
				_id: teacher_id
			});

			if(!doc) {
				res.send({
					err: 1,
					msg: "Can not find this teacher"
				});
				return;
			}

			res.send(doc);

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleTeacherCreateOrModify(req: any, res: any) {
		try {

			let isEditMode = (req.body._id && !isNaN(Number(req.body._id))) ? true : false;

			// Mofidy the teacher
			if(isEditMode) {
				let doc = await Teacher.findOne({
					_id: { $ne: Number(req.body._id) },
					teacher_number: req.ipTeacher.teacher_number
				});

				if(doc) {
					res.send({
						err: 1,
						msg: "This Teacher number is already used"
					});
					return;
				}

				let updateRecord = await Teacher.updateOne({
					_id: Number(req.body._id)
				}, {
					$set: req.ipTeacher
				});

				if(!updateRecord) {
					res.send({
						err: 1,
						msg: "Can not update this teacher"
					});
					return;
				}

				res.send({ ok: 1 });

			} else {
				// Create a new teacher

				let doc = await Teacher.findOne({teacher_number: req.ipTeacher.teacher_number});
				if(doc) {
					res.send({
						err: 1,
						msg: "This Teacher number is already used"
					});
					return;
				}

				let newRecord = await Teacher.save(req.ipTeacher);
				
				if(!newRecord) {
					res.send({
						err: 1,
						msg: "Can not create this teacher"
					});
					return;
				}

				res.send({
					ok: 1,
					teacher_id: newRecord._id
				});
			}

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleRemoveTeacher(req: any, res: any) {
		try {

			let teacher_id = Number(req.body.id);

			let removeRecord = await Teacher.remove({ _id: teacher_id });

			if(!removeRecord) {
				res.send({
					err: 1,
					msg: "Can not remove this teacher"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	static clone() {
		return new TeacherRouter();
	}
};

module.exports = TeacherRouter.clone();