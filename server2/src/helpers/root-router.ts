import express from 'express';

let router = express.Router();

class RootRouter {
	router: any;

	constructor() {
		this.router = router;
	}
}

export default RootRouter;