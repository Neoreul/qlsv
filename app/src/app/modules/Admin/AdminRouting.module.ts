import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AdminComponent }          from '../Admin/Admin/Admin.component';
import { AdminDashboardComponent } from './AdminDashBoard/AdminDashboard.component';
import { ManageClassesComponent }  from './ManageClasses/ManageClasses/ManageClasses.component';
import { ModifyClassComponent }    from './ManageClasses/ModifyClass/ModifyClass.component';
import { ManageStudentsComponent } from './ManageStudents/ManageStudents/ManageStudents.component';
import { ModifyStudentComponent }  from './ManageStudents/ModifyStudent/ModifyStudent.component';
import { ManageTeacherComponent }  from './ManageTeachers/ManageTeachers/ManageTeachers.component';
import { ModifyTeacherComponent }  from './ManageTeachers/ModifyTeacher/ModifyTeacher.component';
import { ManageSubjectsComponent } from './ManageSubjects/ManageSubjects/ManageSubjects.component';
import { ModifySubjectComponent }  from './ManageSubjects/ModifySubject/ModifySubject.component';

import { AuthGuard }               from '../Auth/Auth.guard';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				canActivateChild: [AuthGuard],
				children: [
					{ path: 'dashboard',        component: AdminDashboardComponent },
					{ path: 'classes',          component: ManageClassesComponent },
					{ path: 'classes/create',   component: ModifyClassComponent },
					{ path: 'classes/edit/:id', component: ModifyClassComponent },
					{ path: 'students',         component: ManageStudentsComponent },
					{ path: 'students/create',  component: ModifyStudentComponent },
					{ path: 'students/edit/:id',component: ModifyStudentComponent },
					{ path: 'teachers',         component: ManageTeacherComponent },
					{ path: 'teachers/create',  component: ModifyTeacherComponent },
					{ path: 'teachers/edit/:id',component: ModifyTeacherComponent },
					{ path: 'subjects',         component: ManageSubjectsComponent },
					{ path: 'subjects/create',  component: ModifySubjectComponent },
					{ path: 'subjects/edit/:id',component: ModifySubjectComponent },
				]
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AdminRoutingModule {}