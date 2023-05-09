import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../services/news.service';
import { News } from '../models/News';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMess } from '../utils/ErrorMess';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-update-news',
  templateUrl: './create-update-news.component.html',
  styleUrls: ['./create-update-news.component.css']
})
export class CreateUpdateNewsComponent implements OnInit {

  action: string;
  newsId: string;
  errStatus: string;
  succStatus: string;
  quillEditorRef;
  news: News;
  newsForm: FormGroup;


  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private router: Router,
    private toastrService: ToastrService,
    private actRoute: ActivatedRoute,
  ) {
    title.setTitle("VAS-Create News")
  }


  ngOnInit(): void {
    this.initFormGroup();
    this.newsId = this.actRoute.snapshot.paramMap.get('id')
    if(this.newsId){
      this.action ="Update News";
      this.title.setTitle("VAS-Update News")
      this.newsService.getById(this.newsId).subscribe((data: any) => {
        this.news = data;
        this.newsForm.setValue(data);
      })
    }
    else{
      this.action ="Create News";
      this.title.setTitle("VAS-Create News")
    }

  }

  private initFormGroup() {
    this.newsForm = this.formBuilder.group({
      id: new FormControl(null),
      title: new FormControl(null),
      preview: new FormControl(null),
      content: new FormControl(null)
    })
  }

  get titleNewsError(): String {
		const formControl = this.newsForm.get('title');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_ID_MAXLENGTH : '');
  }
  
  get previewNewsError(): string {
		const formControl = this.newsForm.get('preview');
		return formControl.hasError('required') ? ErrorMess.REQUIRE : (formControl.hasError('maxlength') ? ErrorMess.EMPLOYEE_NAME_MAXLENGTH : '');
  }
  
  onSubmit() {
    if(this.newsForm.invalid){
      return;
    }
    if(this.newsId) {
      this.onUpdateEmployee();
    } else {
      this.onCreateNews();
    }
  }

  onCreateNews() {
    if (this.newsForm.invalid) {
      return;
    }
    const news: News = this.newsForm.value;
    this.newsService.insert(news).subscribe((res: any) => {
      this.toastrService.success('Create News Success!!')
      if (res) {
        this.router.navigate(['/news','list'])
      }
    }, (error) => {
      this.toastrService.error('ffffffDatabase connection error!!')
    }
    );
  }

  onUpdateEmployee() {
    let news1: News = this.newsForm.value;
    console.log(news1);
    let news2: News = this.newsForm.value;
		this.newsService.updateById(this.newsId, news2).subscribe(data => {
      this.toastrService.success('Update News Success')
        console.log(data);		
			
		}, (error) => {
      this.toastrService.error('Database connection error!!')
		}, () => {

		})

  }

  goToShowNews() {
		this.router.navigate(['/news', 'list'])
	}
  
  resetForm() {
    this.newsForm.reset()
  }

}
