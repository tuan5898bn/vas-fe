import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccine } from '../models/Vaccine';
import { VaccineService } from '../services/vaccine.service';
import { Constant } from '../utils/Constant';
import { ErrorMess } from '../utils/ErrorMess';
import { ToastrService } from 'ngx-toastr';
import { SuccessMess } from '../utils/SuccessMess';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-vaccine-action',
  templateUrl: './vaccine-action.component.html',
  styleUrls: ['./vaccine-action.component.css']
})
export class VaccineActionComponent implements OnInit {

  action: string;
  vacId: string;
  vaccineTypes;
  vaccineForm: FormGroup;
  errStatus: string;
  canActive;
  vaccine: Vaccine;
  countries: string[] = [];
  filteredCountries: Observable<string[]>;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private vaccineService: VaccineService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getVaccineTypeList();
    this.vacId = this.actRoute.snapshot.paramMap.get('id');
    if (this.vacId) {
      this.action = "UPDATE VACCINE";
      this.title.setTitle("VAS-Update Vaccine");
      this.vaccineService.getVaccineById(this.vacId).subscribe((data: any) => {
        this.vaccine = data;

        this.vaccineForm.setValue(data)
        this.vaccineForm.controls['vaccineID'].disable({ onlySelf: true })
        this.canActive = data.active;
        if (!this.canActive) {
          this.vaccineForm.controls['active'].disable()
        }
      },
        error => this.errStatus = error)
    } else {
      this.action = "CREATE VACCINE";
      this.title.setTitle("VAS-Create Vaccine");

      this.vaccineForm.controls['active'].disable();
      this.vaccineForm.controls['active'].setValue(true);
      this.vaccineForm.getRawValue()
    }
    this.vaccineService.getCountryName().subscribe(val => {
      this.countries = val
      this.filteredCountries = this.vaccineForm.controls['origin'].valueChanges.pipe(
        startWith(''),
        map(value => this._filterCountry(value))
      );
    })
    
  }
  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(ct => ct.toLowerCase().indexOf(filterValue) === 0);
  }
  getVaccineTypeList() {
    this.vaccineService.getAllVaccineTypeWithStatusEqualTrue().subscribe(data => {
      this.vaccineTypes = data;
    })
  }

  initForm() {
    this.vaccineForm = this.formBuilder.group({
      vaccineID: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(Constant.NUMBER)]),
      active: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      usage: new FormControl(null, [Validators.maxLength(200)]),
      indication: new FormControl(null, [Validators.maxLength(200)]),
      contraindication: new FormControl(null, [Validators.maxLength(200)]),
      numberOfInjection: new FormControl(null, [Validators.max(15), Validators.pattern(Constant.NUMBER)]),
      nextTimeStart: new FormControl(null),
      nextTimeEnd: new FormControl(null),
      origin: new FormControl(null, [Validators.maxLength(50)]),
      vaccineTypeId: new FormControl(null, [Validators.required]),
      vaccineTypeName: new FormControl(null)
    },
      { validator: this.fromToDate('nextTimeStart', 'nextTimeEnd') });
  }

  fromToDate(fromDateField: string, toDateField: string, errorName: string = 'fromToDate'): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField).value;
      const toDate = formGroup.get(toDateField).value;
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if ((fromDate !== null && toDate !== null) && fromDate >= toDate) {
        return { [errorName]: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.vaccineForm.invalid) {
      return;
    }
    if (this.vacId) {
      this.onUpdateVaccine();
    } else {
      this.onCreateVaccine();
    }
  }

  onCreateVaccine() {
    let vaccine: Vaccine = this.vaccineForm.value;
    console.log(vaccine);

    this.vaccineService.createVaccine(vaccine).subscribe(
      (data) => {
        this.goToVaccineList();
        this.toastrService.success(SuccessMess.CREATE_VACCINE, "SUCCESS", { timeOut: 2500, progressBar: true })
      },
      (error) => {
        if (error == "Unknown Error") {
          this.toastrService.error(SuccessMess.DB_ERROR, "ERROR", { timeOut: 2500, progressBar: true })

        }
        this.errStatus = error
      }
    );
  }

  onUpdateVaccine() {
    let vac: Vaccine = this.vaccineForm.value;
    let vaccine: Vaccine = this.vaccineForm.value;
    this.vaccineService.updateVaccine(this.vacId, vaccine).subscribe(data => {
      this.goToVaccineList();
      this.toastrService.success(SuccessMess.UPDATE_VACCINE, "SUCCESS", { timeOut: 2500, progressBar: true })

    },
      (error) => {
        if (error == "Unknown Error") {
          error = "Database connection error"
        }
        this.errStatus = error
      }
    );
  }

  get vaccineIdErrorMess(): String {
    const formControl = this.vaccineForm.get('vaccineID');
    return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('pattern') ? ErrorMess.NUMBER_PATTERN : (formControl.hasError('minlength') ? ErrorMess.VACCINE_ID_LENGTH : (formControl.hasError('maxlength') ? ErrorMess.VACCINE_ID_LENGTH : '')));
  }

  get vaccineNameErrorMess(): String {
    const formControl = this.vaccineForm.get('name');
    return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.VACCINE_NAME_MAXLENGTH : '');
  }

  get vaccineTypeErrorMess(): String {
    const formControl = this.vaccineForm.get('vaccineTypeId');
    return formControl.hasError('required') ? ErrorMess.REQUIRE : '';
  }

  get numberOfInjectErrorMess(): String {
    const formControl = this.vaccineForm.get('numberOfInjection');
    return formControl.hasError('max') ? ErrorMess.NUMBER_OF_INJECTION_LENGTH : (formControl.hasError('pattern') ? ErrorMess.NUMBER_PATTERN : '');
  }

  get usageErrorMess(): String {
    const formControl = this.vaccineForm.get('usage');
    return formControl.hasError('maxlength') ? ErrorMess.MAXLENGTH_200 : '';
  }

  get indicationErrorMess(): String {
    const formControl = this.vaccineForm.get('indication');
    return formControl.hasError('maxlength') ? ErrorMess.MAXLENGTH_200 : '';
  }

  get contraindicationErrorMess(): String {
    const formControl = this.vaccineForm.get('contraindication');
    return formControl.hasError('maxlength') ? ErrorMess.MAXLENGTH_200 : '';
  }

  get nextTimeStartErrorMess(): String {
    const formControl = this.vaccineForm.get('nextTimeStart');
    return formControl.hasError('pattern') ? ErrorMess.DATE_PATTERN : '';
  }

  get nextTimeEndErrorMess(): String {
    const formControl = this.vaccineForm.get('nextTimeEnd');
    return formControl.hasError('pattern') ? ErrorMess.DATE_PATTERN : '';
  }

  get originErrorMess(): String {
    const formControl = this.vaccineForm.get('origin');
    return formControl.hasError('maxlength') ? ErrorMess.ORIGIN_MAXLENTGH : '';
  }

  goToVaccineList() {

    this.router.navigate(['vaccine-manage', 'list']);
  }

  onClearForm() {
    this.vaccineForm.reset();
    this.vaccineForm.controls['active'].setValue(true);
  }
  getPreviousPage() {
    this.router.navigate(['vaccine-manage', 'list']);
  }
}
