import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVaccineTypeComponent } from './create-vaccine-type/create-vaccine-type.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ErrorComponent } from './error/error.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ReportVaccineComponent } from './report-vaccine/report-vaccine.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

import { VaccineTypeListComponent } from './vaccine-type-list/vaccine-type-list.component';

import { VaccineListComponent } from './vaccine-list/vaccine-list.component';

import { AuthGuard } from './_help/auth.guard';
import { UpdateVaccineTypeComponent } from './update-vaccine-type/update-vaccine-type.component';
import { ActionEmployeeComponent } from './action-employee/action-employee.component';
import { VaccienImportComponent } from './vaccien-import/vaccien-import.component';
import { AdminAuthGuard } from './_help/admin-auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { VaccineActionComponent } from './vaccine-action/vaccine-action.component';

import { ActionVaccineTypeComponent } from './action-vaccine-type/action-vaccine-type.component';
import { Action } from 'rxjs/internal/scheduler/Action';


import { CreateUpdateNewsComponent } from './create-update-news/create-update-news.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{
		path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
			{ path: 'access-denied', component: AccessDeniedComponent },
			{ path: 'dashboard', component: HomeComponent },
			{
				path: 'employee-manage', children: [
					{ path: 'list', component: EmployeeListComponent },
					{ path: 'create-employee', component: ActionEmployeeComponent, canActivate: [AdminAuthGuard] },
					{ path: 'update-employee/:id', component: ActionEmployeeComponent, canActivate: [AdminAuthGuard] }
				]
			}, {
				path: 'vaccine-type-manage', children: [
					{ path: 'list', component: VaccineTypeListComponent },
					{ path: 'create-vaccine-type', component: CreateVaccineTypeComponent , canActivate: [AdminAuthGuard]},
					{ path: 'update-vaccine-type/:id', component: UpdateVaccineTypeComponent, canActivate: [AdminAuthGuard] }
				]
			},
			{
				path: 'vaccine-manage', children: [
					{ path: 'list', component: VaccineListComponent },
					{ path: 'create', component: VaccineActionComponent,canActivate: [AdminAuthGuard]},
					{ path: 'update/:id', component: VaccineActionComponent,canActivate: [AdminAuthGuard] },
					{ path: 'import', component: VaccienImportComponent,canActivate: [AdminAuthGuard]}
				]
			},
			{
				path: 'report', children: [
					{ path: 'vaccine-report', component: ReportVaccineComponent }
				]
			},
			{
				path: 'news', children: [
					{ path: 'list', component: NewsComponent },
					{ path: 'create-news', component: CreateUpdateNewsComponent , canActivate: [AdminAuthGuard]},
					{ path: 'update-news/:id', component: CreateUpdateNewsComponent , canActivate: [AdminAuthGuard]}
				]
			}
		]
	},
	{ path: '404', component: ErrorComponent },
	{ path: '**', redirectTo: '/404', pathMatch: 'full' },

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
