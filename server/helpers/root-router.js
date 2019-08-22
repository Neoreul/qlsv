let express  = require('express');
let router   = express.Router();
let mongoose = require('mongoose');

class RootRouter {
	constructor() {
		this.router = router;
	}
}

module.exports = RootRouter;