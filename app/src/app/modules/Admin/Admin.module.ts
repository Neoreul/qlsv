import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';

import { AdminComponent }          from './Admin/Admin.component';
import { AdminDashboardComponent } from './AdminDashBoard/AdminDashboard.component';
import { ManageClassesComponent }  from './ManageClasses/ManageClasses/ManageClasses.component';
import { ModifyClassComponent }    from './ManageClasses/ModifyClass/ModifyClass.component';
import { ManageStudentsComponent } from './ManageStudents/ManageStudents/ManageStudents.component';
import { ModifyStudentComponent }  from './ManageStudents/ModifyStudent/ModifyStudent.component';
import { ManageTeacherComponent }  from './ManageTeachers/ManageTeachers/ManageTeachers.component';
import { ModifyTeacherComponent }  from './ManageTeachers/ModifyTeacher/ModifyTeacher.component';
import { ManageSubjectsComponent } from './ManageSubjects/ManageSubjects/ManageSubjects.component';
import { ModifySubjectComponent }  from './ManageSubjects/ModifySubject/ModifySubject.component';

import { DateFormatDirective }     from '../Utils/DateFormat/DateFormat.directive';
import { SortByPipe }  from '../Utils/SortByTable/SortBy.pipe'; 

import { AdminRoutingModule }      from './AdminRouting.module';

import { AuthGuard }               from '../Auth/Auth.guard';
import { ClassService }            from './ManageClasses/ManageClasses.service';
import { StudentService }          from './ManageStudents/ManageStudents.service';
import { TeacherService }          from './ManageTeachers/ManageTeachers.service';
import { SubjectService }          from './ManageSubjects/ManageSubjects.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AdminRoutingModule
	],
	declarations: [
		DateFormatDirective,
		SortByPipe,
		AdminComponent,
		AdminDashboardComponent,
		ManageClassesComponent,
		ModifyClassComponent,
		ManageStudentsComponent,
		ModifyStudentComponent,
		ManageTeacherComponent,
		ModifyTeacherComponent,
		ManageSubjectsComponent,
		ModifySubjectComponent
	],
	providers: [
		AuthGuard,
		ClassService,
		StudentService,
		TeacherService,
		SubjectService
	]
})

export class AdminModule {}