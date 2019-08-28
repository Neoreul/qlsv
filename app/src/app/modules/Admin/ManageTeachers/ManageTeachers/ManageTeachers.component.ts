import { Component, OnInit } from '@angular/core';

import { TeacherService } from '../ManageTeachers.service';

@Component({
	selector: 'app-manage-teachers',
	templateUrl: './ManageTeachers.component.html',
	styleUrls: ['./ManageTeachers.component.css']
})

export class ManageTeacherComponent implements OnInit {

	teachers: Object[] = [];

	reverse   : boolean= false;
	nameOrderBy: string= '_id';

	constructor(private teacherService: TeacherService) {}

	ngOnInit() {
		this.getTeachers();
	}

	orderBy(nameOrderBy: string) {
		this.reverse = (this.nameOrderBy == nameOrderBy) ? !this.reverse : false;
		this.nameOrderBy = nameOrderBy;
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