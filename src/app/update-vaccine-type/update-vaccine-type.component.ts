import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../services/image.service';
import { VaccineTypeService } from '../services/vaccine-type.service';
import { ErrorMess } from '../utils/ErrorMess';
import { VaccineType } from '../models/vaccine-type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-update-vaccine-type',
    templateUrl: './update-vaccine-type.component.html',
    styleUrls: ['./update-vaccine-type.component.css']
})
export class UpdateVaccineTypeComponent implements OnInit {

    constructor(
        private title: Title,
        private formBuilder: FormBuilder,
        private _actRoute: ActivatedRoute,
        private vaccineTypeService: VaccineTypeService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private imageService: ImageService) {
        title.setTitle("VAS-Create Employee")
    }
    isActive;
    id: string;
    vaccineType: VaccineType;
    updateVaccineTypeForm: FormGroup;
    errRes: string;
    ngOnInit(): void {
        this.initFormCreate()
        this.id = this._actRoute.snapshot.paramMap.get('id')
        this.vaccineTypeService.getById(this.id).subscribe((res: any) => {
            this.isActive=res.status;
            this.vaccineType = res;
            this.updateVaccineTypeForm.setValue(res)
        })
    }
    initFormCreate() {
        this.updateVaccineTypeForm = this.formBuilder.group({
            id: new FormControl(null, [Validators.required, Validators.maxLength(36)]),
            vaccineTypeName: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            description: new FormControl(null, [Validators.maxLength(200)]),
            status: new FormControl(null, [Validators.required]),
            image: new FormControl(null)
        })
    }
    updateVaccineType() {

        if (this.updateVaccineTypeForm.invalid) {
            return;
        }
        let vaccineType: VaccineType = this.updateVaccineTypeForm.value;
        if (this.successResponse) {
			vaccineType.image = this.successResponse.link
		}
        this.vaccineTypeService.updateVaccineType(vaccineType).subscribe(data => {
            this.openSnackBar("Update Success","Update")
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
        const formControl = this.updateVaccineTypeForm.get('id');
        return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ID_MAXLENGTH : '');
    }
    get vaccineTypeNameErrorMess(): string {
        const formControl = this.updateVaccineTypeForm.get('vaccineTypeName');
        return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.VACCINE_TYPE_NAME_MAXLENGTH : '');
    }
    get vaccineTypeDescriptionErrorMess(): string {
        const formControl = this.updateVaccineTypeForm.get('description');
        return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.VACCINE_TYPE_DESCRIPTION_MAXLENGTH : '');
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
        this.updateVaccineTypeForm.reset()
    }
}
