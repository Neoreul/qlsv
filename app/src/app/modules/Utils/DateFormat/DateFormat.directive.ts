import { Directive, ElementRef, OnInit } from '@angular/core';
import { element } from 'protractor';

@Directive({
	selector: '[dateFormat]'
})

export class DateFormatDirective implements OnInit {

	constructor(private elem: ElementRef) {}

	ngOnInit() {
		setTimeout(() => {
			let value = this.elem.nativeElement.innerText;
			this.format(value);
		}, 150);
	}

	format(value: string) {
		let date = new Date(Number(value));
        let d    = date.getDate();
        let m    = date.getMonth() + 1;
        let y    = date.getFullYear();

        let strMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Now", "Dec"];
        
		this.elem.nativeElement.innerText = strMonths[m] + " " + d + ", " + y;
	}
}