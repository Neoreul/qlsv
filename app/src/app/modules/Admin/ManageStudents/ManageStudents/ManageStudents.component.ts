import { Component, OnInit } from '@angular/core';

import { StudentService } from '../ManageStudents.service';

@Component({
	selector: 'app-manage-students',
	templateUrl: './ManageStudents.component.html',
	styleUrls: ['./ManageStudents.component.css']
})

export class ManageStudentsComponent implements OnInit {

	students: Object[] = [];
	counts  : number   = 0;

	constructor(private studentService: StudentService) {}

	ngOnInit() {
		this.getStudents();
	}

	getStudents() {
		// TODO: limit, skip, filter, keyword

		this.studentService.getAll()
			.then(resData => {

				console.log("students: ", resData);

				if(resData.students) {
					this.students = resData.students;
					this.counts   = resData.counts;
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}