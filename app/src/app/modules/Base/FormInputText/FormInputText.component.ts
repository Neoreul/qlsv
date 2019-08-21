import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'form-input-text',
	templateUrl: './FormInputText.component.html',
	styleUrls: ['./FormInputText.component.css']
})

export class FormInputTextComponent implements OnInit {
	@Input() id: string;
	@Input() type: string;
	@Input() name: string;
	@Input() label: string;
	@Input() value: string;

	constructor() {}

	ngOnInit() {}
}