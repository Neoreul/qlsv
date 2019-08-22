import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../ManageSubjects.service';

@Component({
	selector: 'app-manage-subjects',
	templateUrl: './ManageSubjects.component.html',
	styleUrls: ['./ManageSubjects.component.css']
})

export class ManageSubjectsComponent implements OnInit {

	subjects: Object[] = [];

	constructor(private subjectService: SubjectService) {}

	ngOnInit() {
		this.getClasses();
	}

	getClasses() {
		this.subjectService.getAll()
			.then(resData => {
				// console.log("subjects: ", resData);

				if(resData.subjects) {
					this.subjects = resData.subjects;
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}