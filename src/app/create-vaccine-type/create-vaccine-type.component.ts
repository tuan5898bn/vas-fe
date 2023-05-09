import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { title } from 'process';
import { ImageService } from '../services/image.service';
import { VaccineTypeService } from '../services/vaccine-type.service';
import { Constant } from '../utils/Constant';
import { ErrorMess } from '../utils/ErrorMess';
import { VaccineType } from '../models/vaccine-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-create-vaccine-type',
	templateUrl: './create-vaccine-type.component.html',
	styleUrls: ['./create-vaccine-type.component.css']
})
export class CreateVaccineTypeComponent implements OnInit {
	constructor(
		private title: Title,
		private formBuilder: FormBuilder,
		private vaccineTypeService: VaccineTypeService,
		private router: Router,
		private _snackBar: MatSnackBar,
		private imageService: ImageService) {
		title.setTitle("VAS-Create Vaccine Type")
	}
	createVaccineType: FormGroup;
	errRes: string;
	ngOnInit(): void {
		this.initFormCreate()
	}
	initFormCreate() {
		this.createVaccineType = this.formBuilder.group({
			id: new FormControl(null, [Validators.required, Validators.maxLength(36)]),
			vaccineTypeName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
			description: new FormControl(null),
			image: new FormControl(null),
			status: new FormControl(true, [Validators.required])
		})
	}
	saveVaccineType() {
        if (this.createVaccineType.invalid) {
            return;
        }
        let vaccineType: VaccineType = this.createVaccineType.value;
        if (this.successResponse) {
			vaccineType.image = this.successResponse.link
		}
        this.vaccineTypeService.createVaccineType(vaccineType).subscribe(data => {
			console.log("created");
			this.openSnackBar("Insert Success","Insert")
            this.goToShowVaccineType();
        }, (err: any) => {
			
			if (err) {
				this.errRes = err;
			}
		})
	}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
		  duration: 2000,
		});
	  }
	get vaccineTypeIdErrorMess(): String {
		const formControl = this.createVaccineType.get('id');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ID_MAXLENGTH : '');
	}
	get vaccineTypeNameErrorMess(): string {
		const formControl = this.createVaccineType.get('vaccineTypeName');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_NAME_MAXLENGTH : '');
	}
	successResponse: any;
	isPending = false;
	processFile(e: any) {
		this.isPending = true;
		const file = e.target.files[0];
		this.imageService.uploadImage(file).subscribe((res: any) => {
			this.successResponse = res
		}, err => {
		},()=>{
			this.isPending = false

		})
	}
	goToShowVaccineType() {
		this.router.navigate(['/vaccine-type-manage', 'list'])
	}
	onClearForm() {
		this.createVaccineType.reset()
	}


}
