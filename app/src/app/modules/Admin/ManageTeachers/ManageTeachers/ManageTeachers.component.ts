import { Component, OnInit } from '@angular/core';

import { TeacherService } from '../ManageTeachers.service';

@Component({
	selector: 'app-manage-teachers',
	templateUrl: './ManageTeachers.component.html',
	styleUrls: ['./ManageTeachers.component.css']
})

export class ManageTeacherComponent implements OnInit {

	teachers: Object[] = [];

	constructor(private teacherService: TeacherService) {}

	ngOnInit() {
		this.getTeachers();
	}

	getTeachers() {
		this.teacherService.getAll()
			.then(resData => {

				// console.log("teachers: ", resData);

				if(resData.teachers) {
					this.teachers = resData.teachers;
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
}