import RootRouter from '../helpers/root-router';

import Class from '../models/classes';

import Auth from '../middlewares/auth';
import ValidUserInput from '../middlewares/valid-user-input';

let validUserInput = new ValidUserInput();
let auth = new Auth();

class ClassRouter extends RootRouter {
	constructor() {
		super();

		this.router.post("/api/classes", this.handleGetClasses.bind(this));
		this.router.post("/api/classes/find", this.handleGetClass.bind(this));
		this.router.post("/api/classes/create-or-modify", validUserInput.createOrModifyClass, this.handleClassCreateModify.bind(this));
		this.router.post("/api/classes/remove", this.handleRemoveClass.bind(this));

		return this.router;
	}

	async handleGetClasses(req: any, res: any) {
		try {

			let docs  = await Class.find({}, {
				class_number   : 1,
				name           : 1,
				description    : 1,
				started_year   : 1,
				ended_year     : 1,
				status         : 1,
				date_modified  : 1
			});

			res.send({
				classes: docs
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleGetClass(req: any, res: any) {
		try {

			let class_id = Number(req.body.id);

			let doc = await Class.findOne({
				_id: class_id
			});

			if(!doc) {
				res.send({
					err: 1,
					msg: "Can not find this class"
				});
				return;
			}

			res.send(doc);

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleClassCreateModify(req: any, res: any) {
		try {

			let isEditMode = (req.body._id && !isNaN(Number(req.body._id))) ? true : false;

			// Mofidy the class
			if(isEditMode) {
				let doc = await Class.findOne({
					_id: { $ne: Number(req.body._id) },
					class_number: req.ipClass.class_number
				});

				if(doc) {
					res.send({
						err: 1,
						msg: "This Class number is already used"
					});
					return;
				}

				let updateRecord = await Class.updateOne({
					_id: Number(req.body._id)
				}, {
					$set: req.ipClass
				});

				if(!updateRecord) {
					res.send({
						err: 1,
						msg: "Can not update this class"
					});
					return;
				}

				res.send({ ok: 1 });

			} else {
				// Create a new class

				let doc = await Class.findOne({class_number: req.ipClass.class_number});
				if(doc) {
					res.send({
						err: 1,
						msg: "This Class number is already used"
					});
					return;
				}

				let newRecord = await Class.save(req.ipClass);
				
				if(!newRecord) {
					res.send({
						err: 1,
						msg: "Can not create this class",
						ip: req.ipClass
					});
					return;
				}

				res.send({
					ok: 1,
					class_id: newRecord._id
				});
			}

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleRemoveClass(req: any, res: any) {
		try {

			let class_id = Number(req.body.id);

			let removeRecord = await Class.remove({ _id: class_id });

			if(!removeRecord) {
				res.send({
					err: 1,
					msg: "Can not remove this class"
				});
				return;
			}

			res.send({ ok: 1 });

		} catch(err) {
			res.status(400).send(err);
		}
	}

	static clone() {
		return new ClassRouter();
	}
};

module.exports = ClassRouter.clone();