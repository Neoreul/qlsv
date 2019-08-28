import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService } from '../ManageStudents.service';
import { ClassService } from '../../ManageClasses/ManageClasses.service';
import { SubjectService } from '../../ManageSubjects/ManageSubjects.service';

@Component({
	selector: 'modify-student',
	templateUrl: './ModifyStudent.component.html',
	styleUrls: ['./ModifyStudent.component.css']
})

export class ModifyStudentComponent implements OnInit, OnChanges {
	title    : string;
	studentId  : string;
	studentItem: Object = {};
	isError  : boolean = false;
	notify   : string;
	isDone   : boolean = false;
	tab      : string = 'general';
	classes  : Object[];
	subjects : Object[];

	constructor(
		private studentService: StudentService,
		private classService: ClassService,
		private subjectService: SubjectService,
		private activatedRoute: ActivatedRoute,
		private router: Router) {
		this.getClasses();
	}

	ngOnInit() {
		this.checkMode();
	}

	ngOnChanges() {
		this.checkMode();
	}

	changeTab(tab: string='general') {
		this.tab = tab;
	}

	checkMode() {
		this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
		// console.log(this.studentId);

		if(this.studentId && !isNaN(Number(this.studentId))) {
			this.title = "Edit Student";
			this.getStudent();
		} else {
			this.studentItem = {};
			this.title = "Create Student";
			this.getSubjects();
		}
	}

	getStudent() {
		this.studentService.get(Number(this.studentId))
			.then(resData => {
				// console.log("student: ", resData);
				if(resData) {
					this.studentItem = resData;

					this.getSubjects();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getClasses() {
		this.classService.getAll()
			.then(resData => {
				// console.log("classes: ", resData);
				this.classes = resData.classes;
			})
			.catch(err => {
				console.log(err);
			})
	}

	getSubjects() {
		this.subjectService.getAll()
			.then(resData => {
				if(resData.subjects) {
					this.subjects = resData.subjects;

					if(this.studentId) {
						this.subjects.forEach(s => {
							s["checked"] = false;

							for(let i = 0; i < this.studentItem["subjects"].length; i++) {
								if(this.studentItem["subjects"][i] === s["_id"]) {
									s["checked"] = true;
								}
							}
						});
					}

					// console.log(this.subjects);
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	createOrModify(isContinue: boolean=false) {
		this.notify = "";
		this.isError= false;
		this.isDone = false;

		this.studentItem["subjects"] = [];
		this.subjects.forEach(s => {
			if(s["checked"] == true) {
				this.studentItem["subjects"].push(s["_id"]);
			}
		});

		// console.log(this.studentItem);

		this.studentService.createOrModify(this.studentItem)
			.then(resData => {
				// console.log("create or modify student: ", resData);

				if(resData.ok && resData.ok === 1) {
					this.isDone = true;
					if(!isContinue) {
						this.studentItem = {};
						this.router.navigate(['admin/students']);
					}
				}

				if(resData.err && resData.err === 1) {
					this.notify = resData.msg;
					this.isError= true;
				}

			})
			.catch(err => {
				console.log(err);
			});
	}

	delete() {
		let isConfirm = confirm("Are you sure delete this student?");
        if(isConfirm){
            this.studentService.remove(Number(this.studentId))
            	.then(resData => {
            		// console.log(resData);
            		this.router.navigate(['admin/students']);
            	})
            	.catch(err => {
            		console.log(err);
            	});
        }
	}
}