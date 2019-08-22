let RootRouter = require('../helpers/root-router');

let Subject    = require('../models/subjects');

let validUserInput = require('../middlewares/valid-user-input');

class SubjectRouter extends RootRouter {
	constructor() {
		super();

		this.router.post("/api/subjects", this.handleGetSubjects.bind(this));
		this.router.post("/api/subjects/find", this.handleGetSubject.bind(this));
		this.router.post("/api/subjects/create-or-modify", validUserInput.createOrModifySubject, this.handleSubjectCreateModify.bind(this));
		this.router.post("/api/subjects/remove", this.handleRemoveSubject.bind(this));

		return this.router;
	}

	async handleGetSubjects(req, res) {
		try {

			let docs  = await Subject.find({}, {
				subject_number : 1,
				name           : 1,
				description    : 1,
				started_year   : 1,
				ended_year     : 1,
				status         : 1,
				date_modified  : 1
			});

			res.send({
				subjects: docs
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleGetSubject(req, res) {
		try {

			let subject_id = Number(req.body.id);

			let doc = await Subject.findOne({
				_id: subject_id
			});

			if(!doc) {
				res.send({
					err: 1,
					msg: "Can not find this subject"
				});
				return;
			}

			res.send(doc);

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleSubjectCreateModify(req, res) {
		try {

			let isEditMode = (req.body._id && !isNaN(Number(req.body._id))) ? true : false;

			// Mofidy the subject
			if(isEditMode) {
				let doc = await Subject.findOne({
					_id: { $ne: Number(req.body._id) },
					subject_number: req.ipSubject.subject_number
				});

				if(doc) {
					res.send({
						err: 1,
						msg: "This Subject number is already used"
					});
					return;
				}

				let updateRecord = await Subject.updateOne({
					_id: Number(req.body._id)
				}, {
					$set: req.ipSubject
				});

				if(!updateRecord) {
					res.send({
						err: 1,
						msg: "Can not update this subject"
					});
					return;
				}

				res.send({ ok: 1 });

			} else {
				// Create a new subject

				let doc = await Subject.findOne({subject_number: req.ipSubject.subject_number});
				if(doc) {
					res.send({
						err: 1,
						msg: "This Subject number is already used"
					});
					return;
				}

				let newRecord = await Subject.save(req.ipSubject);
				
				if(!newRecord) {
					res.send({
						err: 1,
						msg: "Can not create this subject"
					});
					return;
				}

				res.send({
					ok: 1,
					subject_id: newRecord._id
				});
			}

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleRemoveSubject(req, res) {
		try {

			let subject_id = Number(req.body.id);

			let removeRecord = await Subject.remove({ _id: subject_id });

			if(!removeRecord) {
				res.send({
					err: 1,
					msg: "Can not remove this subject"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	static clone() {
		return new SubjectRouter();
	}
}

module.exports = SubjectRouter.clone();