import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'SortBy'
})

export class SortByPipe implements PipeTransform {

	transform(value: Array<any>, nameOrderBy?:string, reverse?:boolean): any {
		let sortName = nameOrderBy || "_id";

		value = reverse ? this.sort(value, sortName).reverse() : this.sort(value, sortName);

		return value;
	}

	sort(items: Array<any>, key: string): Array<any> {
		items = items.sort((a, b) => {
			if(a[key] < b[key]) return -1;
			else if(a[key] > b[key]) return 1;
			return 0;
		});

		return items;
	}
}