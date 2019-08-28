let getDate = () => {
	return new Date().getTime();
};

let parseString = (num) => {
	let n = num;
	if(Number(n) === NaN) {n = 0;}
	return n.toString();
};

module.exports = () => {
	let date   = getDate();
	return parseString(date);
};
