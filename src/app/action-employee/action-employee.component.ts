import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
import { ImageService } from '../services/image.service';
import { Constant } from '../utils/Constant';
import { ErrorMess } from '../utils/ErrorMess';
import { ToastrService } from 'ngx-toastr';
import { SuccessMess } from '../utils/SuccessMess';

function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
	const now = new Date();
	const datePick = new Date(control.value);
	if (now.getFullYear() - datePick.getFullYear() < 18) {
		return { 'age': true };
	}
	return null;
}

@Component({
	selector: 'app-action-employee',
	templateUrl: './action-employee.component.html',
	styleUrls: ['./action-employee.component.css']
})
export class ActionEmployeeComponent implements OnInit {

	constructor(
		private title: Title,
		private formBuilder: FormBuilder,
		private employeeService: EmployeeService,
		private _actRoute: ActivatedRoute,
		private _router: Router,
		private imageService: ImageService,
		private toastrService: ToastrService
	) { }
	action: string;
	EmployeeForm: FormGroup;
	errRes: string;
	empId: string;
	empIdViewDetail;
	employee: Employee;
	isViewDetail = false;
	startDate = new Date(2000, 0, 1);

	ngOnInit(): void {
		this.initForm();
		this.empId = this._actRoute.snapshot.paramMap.get('id')
		if (this.empId) {
			this.action = "Update Employee";
			this.title.setTitle("VAS-Update Employee")
			this.employeeService.getById(this.empId).subscribe((res: any) => {
				this.employee = res;
				this.EmployeeForm.setValue(res)
				this.EmployeeForm.controls['employeeId'].disable({ onlySelf: true });
				// this.EmployeeForm.controls['username'].disable()
				// this.EmployeeForm.controls['password'].disable()
			})
		} else {
			this.title.setTitle("VAS-Create Employee")
			this.action = "Create Employee";
		}
	}
	initForm() {
		this.EmployeeForm = this.formBuilder.group({
			employeeId: new FormControl(null, [Validators.required, Validators.maxLength(36)],),
			employeeName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
			dateOfBirth: new FormControl(null, [Validators.required, AgeValidator]),
			gender: new FormControl(null),
			phone: new FormControl(null, [Validators.required, Validators.pattern(Constant.PARTTEN_PHONE)]),
			address: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
			email: new FormControl(null, [Validators.required, Validators.email]),
			position: new FormControl(null),
			workingPlace: new FormControl(null),
			image: new FormControl(null),
			username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
		})
	}

	get employeeIdErrorMess(): String {
		const formControl = this.EmployeeForm.get('employeeId');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ID_MAXLENGTH : '');
	}
	get employeeNameErrorMess(): string {
		const formControl = this.EmployeeForm.get('employeeName');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_NAME_MAXLENGTH : '');
	}
	get employeeEmailErrorMess(): string {
		const formControl = this.EmployeeForm.get('email');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('email') ? ErrorMess.EMPLOYEE_EMAIL_PARTTEN : '');
	}
	get employeePhoneErrorMess(): string {
		const formControl = this.EmployeeForm.get('phone');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('pattern') ? ErrorMess.EMPLOYEE_PHONE_PARTTEN : '');
	}
	get employeeAddressErrorMess(): string {
		const formControl = this.EmployeeForm.get('address');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ADDRESS_MAXLENGTH : '');
	}
	get employeeUsernameErrorMess(): string {
		const formControl = this.EmployeeForm.get('username');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('minlength') ? ErrorMess.EMPLOYEE_USERNAME_MINLENGTH : '');
	}
	get employeePasswordErrorMess(): string {
		const formControl = this.EmployeeForm.get('password');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('minlength') ? ErrorMess.EMPLOYEE_PASSWORD_MINLENGTH : '');
	}
	get employeeDateOfBirthErrorMess(): string {
		const formControl = this.EmployeeForm.get('dateOfBirth');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : formControl.hasError('age') ? ErrorMess.EMPLOYEE_BIRTH_INVALID : '';
	}

	onCreateEmployee() {
		let employee: Employee = this.EmployeeForm.value;
		if (this.successResponse) {
			employee.image = this.successResponse.link
		}
		this.employeeService.create(employee).subscribe(res => {
			this.goToEmployeeList();
			this.toastrService.success(SuccessMess.CREATE_EMPLOYEE, 'SUCCESS', { timeOut: 2500, progressBar: true })
		}, (err: any) => {
			if (err) {
				this.errRes = err;
				this.toastrService.error(ErrorMess.CREATE_EMPLOYEE,"FAIL",{timeOut: 2500, progressBar: true})

			}
		}, () => {

		})
	}
	onUpdateEmloyee() {
		let emp: Employee = this.EmployeeForm.value;


		if (this.successResponse) {
			emp.image = this.successResponse.link;
		}
		this.employeeService.updateById(this.empId, emp).subscribe(data => {
			this.goToEmployeeList();
			this.toastrService.success(SuccessMess.UPDATE_EMPLOYEE, 'SUCCESS', { timeOut: 2500, progressBar: true })
		}, err => {
			this.toastrService.error(ErrorMess.UPDATE_EMPLOYEE,"FAIL",{timeOut: 2500, progressBar: true})

		}, () => {

		})
	}
	onSaveForm() {
		this.errRes = null;
		if (this.EmployeeForm.invalid) {
			return;
		}
		if (this.empId) {
			this.onUpdateEmloyee();
		} else {
			this.onCreateEmployee();
		}

	}

	successResponse: any;
	isPending = false;
	processFile(e: any) {
		this.isPending = true;
		const file = e.target.files[0];
		this.imageService.uploadImage(file).subscribe((res: any) => {
			this.successResponse = res
		}, err => {
		}, () => {
			this.isPending = false
		})
	}
	onClearForm() {
		this.EmployeeForm.reset()
	}
	getPreviousPage() {
		window.history.back();
	}

	goToEmployeeList() {
		this._router.navigate(['/employee-manage/list']);
	}


}
