import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ImageService } from '../services/image.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(
		private title: Title,
		private imageService: ImageService) {
		title.setTitle("VAS-DASHBOARD")
	}
	dataUploadSuccess: any;
	isPending = false;
	ngOnInit(): void {
	}
	processFile(e: any) {
		this.isPending = true;
		const file = e.target.files[0];
		this.imageService.uploadImage(file).subscribe((data: any) => {
			this.dataUploadSuccess = data
			this.isPending = false
		}, err => {
			this.isPending = false
		})
	}

}
