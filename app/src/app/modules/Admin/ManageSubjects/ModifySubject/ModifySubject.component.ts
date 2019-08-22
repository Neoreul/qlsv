import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SubjectService } from '../ManageSubjects.service';

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

	constructor(
		private subjectService: SubjectService,
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
}