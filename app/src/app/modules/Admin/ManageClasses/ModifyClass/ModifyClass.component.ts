import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClassService } from '../ManageClasses.service';
import { TeacherService } from '../../ManageTeachers/ManageTeachers.service';

@Component({
	selector: 'modify-class',
	templateUrl: './ModifyClass.component.html',
	styleUrls: ['./ModifyClass.component.css']
})

export class ModifyClassComponent implements OnInit, OnChanges {
	title    : string;
	classId  : string;
	classItem: Object = {};
	isError  : boolean = false;
	notify   : string;
	isDone   : boolean = false;
	teachers : Object[];

	constructor(
		private classService: ClassService,
		private teacherService: TeacherService,
		private activatedRoute: ActivatedRoute,
		private router: Router) {
		this.getTeachers();
	}

	ngOnInit() {
		this.checkMode();
	}

	ngOnChanges() {
		this.checkMode();
	}

	checkMode() {
		this.classId = this.activatedRoute.snapshot.paramMap.get('id');
		// console.log(this.classId);

		if(this.classId && !isNaN(Number(this.classId))) {
			this.title = "Edit Class";
			this.getClass();
		} else {
			this.classItem = {};
			this.title = "Create Class";
		}
	}

	getClass() {
		this.classService.get(Number(this.classId))
			.then(resData => {
				// console.log("class: ", resData);
				if(resData) {
					this.classItem = resData;

				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getTeachers() {
		this.teacherService.getAll()
			.then(resData => {
				if(resData.teachers) {
					this.teachers = resData.teachers;
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

		// console.log(this.classItem);

		this.classService.createOrModify(this.classItem)
			.then(resData => {
				// console.log("create or modify class: ", resData);

				if(resData.ok && resData.ok === 1) {
					this.isDone = true;
					if(!isContinue) {
						this.classItem = {};
						this.router.navigate(['admin/classes']);
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
		let isConfirm = confirm("Are you sure delete this class?");
        if(isConfirm){
            this.classService.remove(Number(this.classId))
            	.then(resData => {
            		// console.log(resData);
            		this.router.navigate(['admin/classes']);
            	})
            	.catch(err => {
            		console.log(err);
            	});
        }
	}
}