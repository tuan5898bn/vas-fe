import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
import { ImageService } from '../services/image.service';
import { Constant } from '../utils/Constant';
import { ErrorMess } from '../utils/ErrorMess';

@Component({
  selector: 'app-view-detail-employee',
  templateUrl: './view-detail-employee.component.html',
  styleUrls: ['./view-detail-employee.component.css']
})
export class ViewDetailEmployeeComponent implements OnInit {

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ViewDetailEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }
  EmployeeForm: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.EmployeeForm.disable();
    this.employeeService.getById(this.data).subscribe((data: any) => {
      this.EmployeeForm.setValue(data);

    })
  }
  onCancelClick(): void {
    this.dialogRef.close();


  }
  initForm() {
    this.EmployeeForm = this.formBuilder.group({
      employeeId: new FormControl(null, [Validators.required, Validators.maxLength(36)],),
      employeeName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      dateOfBirth: new FormControl(null, [Validators.required]),
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



}
