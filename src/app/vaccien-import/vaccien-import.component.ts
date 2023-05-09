import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-vaccien-import',
  templateUrl: './vaccien-import.component.html',
  styleUrls: ['./vaccien-import.component.css']
})
export class VaccienImportComponent implements OnInit {

  errStatus;
  file: any;

  constructor(
    private router: Router,
    private title: Title,
    private vaccineService: VaccineService) {
    title.setTitle('VAS-Import Vaccine')
  }

  ngOnInit(): void {
  }

  processExcelFile(e) {
    this.file = e.target.files[0];
  }
  importFile() {
    if (this.file) {
      this.vaccineService.importFileExcel(this.file).subscribe(data => {
        this.goToVaccineList();
        console.log(data);

      }, error => {
        this.errStatus = error;
      });
    }
  }

	getPreviousPage() {
		this.router.navigate(['vaccine-manage','list']);
  }

  goToVaccineList() {
    this.router.navigate(['vaccine-manage','list'], { queryParams: { status: 'import-success' } });
  }
}
