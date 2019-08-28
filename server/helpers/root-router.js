let express  = require('express');
let router   = express.Router();

class RootRouter {
	constructor() {
		this.router = router;
	}
}

module.exports = RootRouter;