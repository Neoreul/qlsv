import { Component, OnInit } from '@angular/core';

import { ClassService } from '../ManageClasses.service';

@Component({
	selector: 'app-manage-classes',
	templateUrl: './ManageClasses.component.html',
	styleUrls: ['./ManageClasses.component.css']
})

export class ManageClassesComponent implements OnInit {

	classes: Object[] = [];

	constructor(private classService: ClassService) {}

	ngOnInit() {
		this.getClasses();
	}

	getClasses() {
		this.classService.getAll()
			.then(resData => {
				if(resData.classes) {
					this.classes = resData.classes;
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}