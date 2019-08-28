import { Component, OnInit } from '@angular/core';

import { SubjectService } from '../ManageSubjects.service';

@Component({
	selector: 'app-manage-subjects',
	templateUrl: './ManageSubjects.component.html',
	styleUrls: ['./ManageSubjects.component.css']
})

export class ManageSubjectsComponent implements OnInit {

	subjects: Object[] = [];

	reverse   : boolean= false;
	nameOrderBy: string= 'subject_number';

	constructor(private subjectService: SubjectService) {}

	ngOnInit() {
		this.getClasses();
	}

	orderBy(nameOrderBy: string) {
		this.reverse = (this.nameOrderBy == nameOrderBy) ? !this.reverse : false;
		this.nameOrderBy = nameOrderBy;
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