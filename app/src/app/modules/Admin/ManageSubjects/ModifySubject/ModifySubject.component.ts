import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SubjectService } from '../ManageSubjects.service';
import { StudentService } from '../../ManageStudents/ManageStudents.service';

@Component({
	selector: 'modify-subject',
	templateUrl: './ModifySubject.component.html',
	styleUrls: ['./ModifySubject.component.css']
})

export class ModifySubjectComponent implements OnInit, OnChanges {
	title    : string;
	subjectId  : string;
	subjectItem: Object = {};
	isError  : boolean = false;
	notify   : string;
	isDone   : boolean = false;
	tab      : string='general';
	students : Object[] = [];
	// removedStudents: Object[] = [];
	// addedStudents  : Object[] = [];

	studentKeyword: string;
	searchStudentNotify: string="";

	constructor(
		private subjectService: SubjectService,
		private studentService: StudentService,
		private activatedRoute: ActivatedRoute,
		private router: Router) {
		
	}

	ngOnInit() {
		this.checkMode();
	}

	ngOnChanges() {
		this.checkMode();
	}

	changeTab(tab:string='general') {
		this.tab = tab;
	}

	checkMode() {
		this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
		// console.log(this.subjectId);

		if(this.subjectId && !isNaN(Number(this.subjectId))) {
			this.title = "Edit Subject";
			this.getSubject();
		} else {
			this.subjectItem = {};
			this.title = "Create Subject";
		}
	}

	getSubject() {
		this.subjectService.get(Number(this.subjectId))
			.then(resData => {
				// console.log("subject: ", resData);
				if(resData) {
					this.subjectItem = resData;

					this.getStudents();
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	getStudents() {
		this.studentService.getAll({ subject_id: this.subjectItem["_id"] })
			.then(resData => {
				this.students = resData.students;
				// console.log(this.students);
			})
			.catch(err => {
				console.log(err);
			});
	}

	removeStudent(id: number){
		// this.removedStudents.push(id);
		this.students = this.students.filter((s) => {
			return s["_id"] != id;
		});
	}

	createOrModify(isContinue: boolean=false) {
		this.notify = "";
		this.isError= false;
		this.isDone = false;

		// this.subjectItem["removed_students"] = this.removedStudents;
		// this.subjectItem["added_students"]   = this.addedStudents;
		// console.log(this.subjectItem);

		this.subjectService.createOrModify(this.subjectItem)
			.then(resData => {
				// console.log("create or modify subject: ", resData);

				if(resData.ok && resData.ok === 1) {
					this.isDone = true;
					if(!isContinue) {
						this.subjectItem = {};
						this.router.navigate(['admin/subjects']);
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
		let isConfirm = confirm("Are you sure delete this subject?");
        if(isConfirm){
            this.subjectService.remove(Number(this.subjectId))
            	.then(resData => {
            		// console.log(resData);
            		this.router.navigate(['admin/subjects']);
            	})
            	.catch(err => {
            		console.log(err);
            	});
        }
	}

	searchStudents() {
		if(!this.studentKeyword) return;

		this.searchStudentNotify = "";

		this.studentService.getAll({ keyword: this.studentKeyword })
			.then(resData => {
				console.log(resData);
				if(resData.count && resData.count === 1) {
					if(!this.students.find(s => s["student_number"] == resData.students[0]["student_number"])) {
						this.studentService.addSubject({ student_id: resData.students[0]["_id"] , subject_id: this.subjectId })
							.then(resData => {
								// fail
								this.students.push(resData.students[0]);
							})
						// this.addedStudents.push(resData.students[0]["_id"]);
					} else {
						this.searchStudentNotify = "This student has added before!";
					}
				} else {
					this.searchStudentNotify = "Not found this student!";
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
}