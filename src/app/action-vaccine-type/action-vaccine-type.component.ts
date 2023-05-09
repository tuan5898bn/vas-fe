import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineType } from '../models/vaccine-type';
import { ImageService } from '../services/image.service';
import { VaccineTypeService } from '../services/vaccine-type.service';
import { ErrorMess } from '../utils/ErrorMess';

@Component({
  selector: 'app-action-vaccine-type',
  templateUrl: './action-vaccine-type.component.html',
  styleUrls: ['./action-vaccine-type.component.css']
})
export class ActionVaccineTypeComponent implements OnInit {

  constructor(
		private title: Title,
		private formBuilder: FormBuilder,
		private vaccineTypeService: VaccineTypeService,
		private router: Router,
		private _snackBar: MatSnackBar,
    private imageService: ImageService,
    private actRoute: ActivatedRoute) {
		title.setTitle("VAS-Create Vaccine Type")
  }
  action: string;
  vaccineTypeId: string;
  vaccineType: VaccineType;
	vaccineTypeForm: FormGroup;
  errRes: string;
  isActive: boolean;
	ngOnInit(): void {
    this.initFormCreate();
    this.vaccineTypeId = this.actRoute.snapshot.paramMap.get('id');
    if(this.vaccineTypeId) {
      this.action = "UPDATE VACCINE TYPE";
      this.title.setTitle("VAS-Update Vaccine Type");
      this.vaccineTypeService.getById(this.vaccineTypeId).subscribe((data: any) => {
        this.vaccineType = data;
        this.vaccineTypeForm.setValue(data)
        this.vaccineTypeForm.controls['id'].disable({onlySelf: true})
        console.log(data.status);
      },
      error => this.errRes = error)
    } else {
      this.action = "CREATE VACCINE TYPE";
      this.title.setTitle("VAS-Create Vaccine Type");
      this.vaccineTypeForm.controls['status'].setValue(true);
      this.vaccineTypeForm.controls['status'].disable();
    }
	}
	initFormCreate() {
    this.vaccineTypeForm = this.formBuilder.group({
			id: new FormControl(null, [Validators.required, Validators.maxLength(36)]),
			vaccineTypeName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
			description: new FormControl(null),
			image: new FormControl(null),
			status: new FormControl(null, [Validators.required])
		})
	}
	createVaccineType() {
        if (this.vaccineTypeForm.invalid) {
            return;
        }
        let vaccineType: VaccineType = this.vaccineTypeForm.value;
        console.log(vaccineType.status);
        
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
  updateVaccineType() {
    if (this.vaccineTypeForm.invalid) {
        return;
    }
    let vaccineType: VaccineType = this.vaccineTypeForm.value;
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
onClickSave() {
  this.errRes = null;
  if (this.vaccineTypeForm.invalid) {
    return;
  }
  if (this.vaccineTypeId) {
    this.updateVaccineType();
  } else {
    this.createVaccineType();
  }

}
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
		  duration: 2000,
		});
	  }
	get vaccineTypeIdErrorMess(): String {
		const formControl = this.vaccineTypeForm.get('id');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ID_MAXLENGTH : '');
	}
	get vaccineTypeNameErrorMess(): string {
		const formControl = this.vaccineTypeForm.get('vaccineTypeName');
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
		this.vaccineTypeForm.reset()
	}


}
