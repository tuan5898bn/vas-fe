import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from '../utils/Constant';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(
		private title: Title,
		private formBuilder: FormBuilder,
		private authenticateService: AuthenticateService,
		private router: Router,
		private activatedRouter: ActivatedRoute
	) {
		title.setTitle("Login")
	}
	loginForm: FormGroup;
	messLogin;
	goTo;
	cfLoad = {
		color: 'primary',
		mode: 'indeterminate',
		value: 50,
		bufferValue: 75
	}
	isLoginLoading = false;
	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: new FormControl('', [Validators.required, Validators.minLength(6)]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)])
		})
		this.getCallBack();
	}

	getCallBack = () => {
		const callBack = this.activatedRouter.snapshot.queryParamMap.get('call-back');
		console.log(callBack);
		
		if (callBack) {
			this.goTo = `${Constant.FE_URL}${callBack}`
		} else {
			this.goTo = `${Constant.FE_URL}/dashboard`
		}
	}
	get userNameErrorMess(): string {
		const formControl = this.loginForm.get('username');
		return formControl.hasError('required') ? 'you must enter username' : (formControl.hasError('minlength') ? 'username is more than 6 character' : '');
	}
	get passwordErrorMess(): string {
		const formControl = this.loginForm.get('password');
		return formControl.hasError('required') ? 'you must enter password' : (formControl.hasError('minlength') ? 'password is more than 6 character' : '');
	}



	onLogin() {
		this.messLogin = null;
		if (this.loginForm.invalid) {
			return;
		}
		this.isLoginLoading = true;
		this.authenticateService.authentication(this.loginForm.value).subscribe(data => {
			if (data) {
				window.location.href = this.goTo;
			}
		}, err => {
			this.messLogin = err;


			this.isLoginLoading = false;

		}, () => {
			this.isLoginLoading = false;
		});
	}



}
