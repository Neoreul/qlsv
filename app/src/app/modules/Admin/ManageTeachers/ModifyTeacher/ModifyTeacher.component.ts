import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TeacherService } from '../ManageTeachers.service';
import { SubjectService } from '../../ManageSubjects/ManageSubjects.service';

@Component({
	selector: 'modify-teacher',
	templateUrl: './ModifyTeacher.component.html',
	styleUrls: ['./ModifyTeacher.component.css']
})

export class ModifyTeacherComponent implements OnInit, OnChanges {
	title    : string;
	teacherId  : string;
	teacherItem: Object = {};
	isError  : boolean = false;
	notify   : string;
	isDone   : boolean = false;
	tab      : string = 'general';
	subjects : Object[];

	constructor(
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private subjectService: SubjectService,
		private router: Router) {
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
		this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
		// console.log(this.teacherId);

		if(this.teacherId && !isNaN(Number(this.teacherId))) {
			this.title = "Edit Teacher";
			this.getTeacher();
		} else {
			this.teacherItem = {};
			this.title = "Create Teacher";
			this.getSubjects();
		}
	}

	getTeacher() {
		this.teacherService.get(Number(this.teacherId))
			.then(resData => {
				// console.log("teacher: ", resData);
				if(resData) {
					this.teacherItem = resData;

					this.getSubjects();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getSubjects() {
		this.subjectService.getAll()
			.then(resData => {
				// console.log(resData);

				if(resData.subjects) {
					this.subjects = resData.subjects;

					if(this.teacherId) {

						this.subjects.forEach(s => {
							s["checked"] = false;

							for(let i = 0; i < this.teacherItem["subjects"].length; i++) {
								if(this.teacherItem["subjects"][i] === s["_id"]) {
									s["checked"] = true;
								}
							}
						});

					}
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

		this.teacherItem["subjects"] = [];
		this.subjects.forEach(s => {
			if(s["checked"] == true) {
				this.teacherItem["subjects"].push(s["_id"]);
			}
		});

		// console.log(this.teacherItem);

		this.teacherService.createOrModify(this.teacherItem)
			.then(resData => {
				// console.log("create or modify teacher: ", resData);

				if(resData.ok && resData.ok === 1) {
					this.isDone = true;
					if(!isContinue) {
						this.teacherItem = {};
						this.router.navigate(['admin/teachers']);
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
		let isConfirm = confirm("Are you sure delete this teacher?");
        if(isConfirm){
            this.teacherService.remove(Number(this.teacherId))
            	.then(resData => {
            		// console.log(resData);
            		this.router.navigate(['admin/teachers']);
            	})
            	.catch(err => {
            		console.log(err);
            	});
        }
	}
}