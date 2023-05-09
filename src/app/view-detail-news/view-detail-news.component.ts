import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Constant } from '../utils/Constant';
import { ErrorMess } from '../utils/ErrorMess';

@Component({
  selector: 'app-view-detail-news',
  templateUrl: './view-detail-news.component.html',
  styleUrls: ['./view-detail-news.component.css']
})

export class ViewDetailNewsComponent implements OnInit {

  ckeConfig: any;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    public dialogRef: MatDialogRef<ViewDetailNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }
  NewsForm: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.NewsForm.disable();
    this.newsService.getById(this.data).subscribe((data: any) => {
      this.NewsForm.setValue(data);    
    })

    this.ckeConfig = {    

      readOnly : true
          }; 

  }

  onCancelClick(): void {
    this.dialogRef.close();

  }
  initForm() {
    this.NewsForm = this.formBuilder.group({
        id: new FormControl(null),
        postDate: new FormControl(null),
        title: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
        preview: new FormControl(null, [Validators.required, Validators.maxLength(4000)]),
        content: new FormControl(null, [Validators.required])
    })
  }
}