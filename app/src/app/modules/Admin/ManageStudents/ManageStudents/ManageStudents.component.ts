import { Component, OnInit } from '@angular/core';

import { StudentService }    from '../ManageStudents.service';
import { ClassService }      from '../../ManageClasses/ManageClasses.service';
import { SubjectService }    from '../../ManageSubjects/ManageSubjects.service';

@Component({
	selector: 'app-manage-students',
	templateUrl: './ManageStudents.component.html',
	styleUrls: ['./ManageStudents.component.css']
})

export class ManageStudentsComponent implements OnInit {

	students  : Object[] = [];
	count     : number   = 0;
	classes   : Object[];
	subjects  : Object[];

	skip      : string = "0";
	limit     : string = "10";
	pages     : number = 0;
	pagers    : number[];
	classId   : string = 'all';
	subjectId : string = 'all';
	keyword   : string;

	reverse   : boolean= false;
	nameOrderBy: string= 'student_number';

	constructor(
		private studentService: StudentService,
		private classService  : ClassService,
		private subjectService: SubjectService
		) {}

	ngOnInit() {
		this.getClasses();
		this.getSubjects();

		// First load
		this.getStudents();
	}

	orderBy(nameOrderBy: string) {
		this.reverse = (this.nameOrderBy == nameOrderBy) ? !this.reverse : false;
		this.nameOrderBy = nameOrderBy;
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
			});
	}

	getSubjects() {
		this.subjectService.getAll()
			.then(resData => {
				if(resData.subjects) {
					this.subjects = resData.subjects;
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getStudents(page: number=0) {
		// TODO: limit, skip, filter, keyword

		this.studentService.getAll({
			skip      : page,
			limit     : this.limit,
			class_id  : this.classId,
			subject_id: this.subjectId,
			keyword   : this.keyword
			})
			.then(resData => {

				// console.log("students: ", resData);

				this.students = resData.students;
				this.count    = resData.count;
				this.skip     = (Number(resData.skip) + 1).toString();
				this.limit    = resData.limit;
				this.pages    = (Number(this.limit) != 0) ? Math.ceil(Number(this.count) / Number(this.limit)) : 0;
				this.renderPagers();

			})
			.catch(err => {
				console.log(err);
			})
	}

	changeStatus(item: Object) {
		console.log("#Client.changeStatus: ", item);

		this.studentService.changeStatus(item["_id"], item["status"])
			.then(resData => {
				// console.log("Change status successfully!");
			})
			.catch(err => {
				console.log(err);
			});
	}

	renderPagers() {
		this.pagers = [];
		for(let i = 1; i <= this.pages; i++){
			this.pagers.push(i);
		}
	}

	viewPage(skip: string) {
		// console.log(skip);
		let skipPage = Number(skip) > 0 ? Number(skip) - 1 : 0;

		this.getStudents(skipPage);
	}
}