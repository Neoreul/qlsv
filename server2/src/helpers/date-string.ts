let getDate = () => {
	return new Date().getTime();
};

let parseString = (num: number) => {
	let n = num;
	if(Number(n) === NaN) {n = 0;}
	return n.toString();
};

export const dateString = () => {
	let date   = getDate();
	return parseString(date);
};