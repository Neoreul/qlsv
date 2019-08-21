module.exports = (req, res, data={}) => {
	if(req.session.user) {
		data.user = req.session.user;
	}

	res.send(data);
};