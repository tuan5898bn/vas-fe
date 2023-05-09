import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { HelperClassesComponent } from './helper-classes/helper-classes.component';
import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDeleteComponent, EmployeeListComponent, ConfirmUpdateComponent } from './employee-list/employee-list.component';
import { JWTInterceptor } from './_help/jwt.interceptor';
import { ErrorInterceptor } from './_help/error.interceptor';
import { ConfirmInActiveComponent, HasInActiveComponent, NoDataSelectComponent, VaccineTypeListComponent, ViewDetailComponent } from './vaccine-type-list/vaccine-type-list.component';
import { CreateVaccineTypeComponent } from './create-vaccine-type/create-vaccine-type.component';
import { VaccineListComponent, ConfirmInactiveComponent, ConfirmUpdatePage } from './vaccine-list/vaccine-list.component';
import { ReportVaccineComponent } from './report-vaccine/report-vaccine.component';
import { NewsComponent } from './news/news.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateVaccineTypeComponent } from './update-vaccine-type/update-vaccine-type.component';

import { ReportVaccineTableComponent } from './report-vaccine-table/report-vaccine-table.component';
import { ReportVaccineChartComponent } from './report-vaccine-chart/report-vaccine-chart.component';
import { ActionEmployeeComponent } from './action-employee/action-employee.component';
import { ViewDetailEmployeeComponent } from './view-detail-employee/view-detail-employee.component';
import { VaccienImportComponent } from './vaccien-import/vaccien-import.component';
import { VaccineViewdetailComponent } from './vaccine-viewdetail/vaccine-viewdetail.component';
import { ViewDetailNewsComponent } from './view-detail-news/view-detail-news.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { VaccineActionComponent } from './vaccine-action/vaccine-action.component';

import { ActionVaccineTypeComponent } from './action-vaccine-type/action-vaccine-type.component';

import { CreateUpdateNewsComponent } from './create-update-news/create-update-news.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorComponent,
    HelperClassesComponent,
    HomeComponent,
    SidemenuComponent,
    LoginComponent,
    EmployeeListComponent,
    VaccineTypeListComponent,
    CreateVaccineTypeComponent,
    VaccineListComponent,
    ReportVaccineComponent,
    NewsComponent,
    ConfirmDeleteComponent,
    UpdateVaccineTypeComponent,
    UpdateVaccineTypeComponent,
    ConfirmInactiveComponent,
    ConfirmUpdatePage,
    ConfirmUpdateComponent,
    ConfirmInActiveComponent,
    NoDataSelectComponent,
    HasInActiveComponent,
    ViewDetailComponent,
    ReportVaccineTableComponent,
    ReportVaccineChartComponent,
    ActionEmployeeComponent,
    ViewDetailEmployeeComponent,
    VaccienImportComponent,
    VaccineViewdetailComponent,
    ViewDetailNewsComponent,
    AccessDeniedComponent,
    VaccineActionComponent,

    ActionVaccineTypeComponent,

    CreateUpdateNewsComponent

  ],
  imports: [
    ToastrModule.forRoot(),
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
