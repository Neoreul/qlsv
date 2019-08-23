import RootRouter from '../helpers/root-router';

import User from '../models/users';

import Auth from '../middlewares/auth';
import ValidUserInput from '../middlewares/valid-user-input';

let validUserInput = new ValidUserInput();
let auth = new Auth();

class UserRouter extends RootRouter {
	constructor() {
		super();

		this.router.post("/api/users/register", validUserInput.registerUser, this.handleUserRegister.bind(this));
		this.router.post("/api/users/login", validUserInput.loginUser, this.handleUserLogin.bind(this));
		this.router.post("/api/users/logout", auth.userLogin, this.handleUserLogout.bind(this));

		return this.router;
	}

	async handleUserRegister(req: any, res: any) {
		try {

			let doc = await User.findOne({ username: req.ipUser.username });

			if(doc) {
				res.send({
					err: 1,
					msg: "This username is already used"
				});
				return;
			}

			let newRecord = await User.save(req.ipUser);

			if(!newRecord) {
				res.send({
					err: 1,
					msg: "Can not register an user"
				});
				return;
			}

			res.send({
				ok: 1,
				user: newRecord
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleUserLogin(req: any, res: any) {
		try {

			let doc = await User.findOne({
				username: req.ipUser.username,
				password: req.ipUser.password
			});

			if(!doc) {
				res.send({
					err: 1,
					msg: "Username or Password is incorrect"
				});
				return;
			}

			if(!doc.active) {
				res.send({
					err: 1,
					msg: "This account is currently not active"
				});
				return;
			}

			// ok
			req.session.user = {
				username  : doc.username,
				email     : doc.email,
				first_name: doc.first_name,
				last_name : doc.last_name
			};

			res.send({
				ok: 1,
				sessionID: req.sessionID,
				user: req.session.user
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	async handleUserLogout(req: any, res: any) {
		try {

			req.session.user = null;
			res.send({
				ok: 1
			});

		} catch(err) {
			res.status(400).send(err);
		}
	}

	static clone() {
		return new UserRouter();
	}
};

module.exports = UserRouter.clone();