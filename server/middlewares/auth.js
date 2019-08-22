let db   = require('../db');
let _    = require('lodash');


exports.userLogin = async(req, res, next) => {

	let sessions  = db.get().collection('sessions');
	let sessionID = req.body.sessionID;

	let doc = await sessions.findOne({_id: sessionID});

	if(doc) {
		let user = JSON.parse(doc.session).user;

		if(user) {
			req.author = user;
			next();
		} else {
			res.send({err: 1, msg: "You are not login"});
		}
	} else {
		res.send({err: 1, msg: "You are not login"});
	}
};
