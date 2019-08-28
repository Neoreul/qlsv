export const myDateFormat = (value) => {
	let date = new Date(Number(value));
    let d    = date.getDate();
    let m    = date.getMonth() + 1;
    let y    = date.getFullYear();

    let strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Now", "Dec"];
    
	return strMonths[m] + " " + d + ", " + y;
};