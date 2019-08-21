import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { FormsModule }             from '@angular/forms';

import { AdminComponent }          from './Admin/Admin.component';
import { AdminDashboardComponent } from './AdminDashBoard/AdminDashboard.component';
import { ManageClassesComponent }  from './ManageClasses/ManageClasses/ManageClasses.component';
import { ModifyClassComponent }    from './ManageClasses/ModifyClass/ModifyClass.component';
import { ManageStudentsComponent } from './ManageStudents/ManageStudents/ManageStudents.component';
import { ModifyStudentComponent }  from './ManageStudents/ModifyStudent/ModifyStudent.component';

import { DateFormatDirective }     from '../Utils/DateFormat/DateFormat.directive';

import { AdminRoutingModule }      from './AdminRouting.module';

import { AuthGuard }               from '../Auth/Auth.guard';
import { ClassService }            from './ManageClasses/ManageClasses.service';
import { StudentService }          from './ManageStudents/ManageStudents.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		AdminRoutingModule
	],
	declarations: [
		AdminComponent,
		AdminDashboardComponent,
		ManageClassesComponent,
		ModifyClassComponent,
		ManageStudentsComponent,
		ModifyStudentComponent,
		DateFormatDirective
	],
	providers: [
		AuthGuard,
		ClassService,
		StudentService
	]
})

export class AdminModule {}