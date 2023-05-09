import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccineService } from '../services/vaccine.service';
import { Constant } from '../utils/Constant';

@Component({
  selector: 'app-vaccine-viewdetail',
  templateUrl: './vaccine-viewdetail.component.html',
  styleUrls: ['./vaccine-viewdetail.component.css']
})
export class VaccineViewdetailComponent implements OnInit {

  vaccineTypes;
  vaccineForm: FormGroup;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private vaccineService: VaccineService,
    private activedRouter: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<VaccineViewdetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }


  ngOnInit(): void {
    this.getVaccineTypeList();
    this.initFormCreateVaccine();
    this.vaccineForm.disable();
    this.vaccineService.getVaccineById(this.data).subscribe((data: any) => {
      
      
      this.vaccineForm.setValue(data);
    })
  }

  initFormCreateVaccine() {
    this.vaccineForm = this.formBuilder.group({
      vaccineID: new FormControl(null),
      active: new FormControl(null),
      name: new FormControl(null),
      usage: new FormControl(null),
      indication: new FormControl(null),
      contraindication: new FormControl(null),
      numberOfInjection: new FormControl(null),
      nextTimeStart: new FormControl(null),
      nextTimeEnd: new FormControl(null),
      origin: new FormControl(null),
      vaccineTypeId: new FormControl(null),
      vaccineTypeName: new FormControl(null)
    }
    );
  }

  getVaccineTypeList() {
    this.vaccineService.getAllVaccineTypeWithStatusEqualTrue().subscribe((data) => {
      this.vaccineTypes = data;
    });
  }

  get getActive():boolean {
    return this.vaccineForm.get('active').value;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
