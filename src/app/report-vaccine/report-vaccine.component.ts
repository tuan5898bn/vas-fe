import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from '../models/Report';
import { Subject } from 'rxjs';
import { ReportVaccineTableComponent } from '../report-vaccine-table/report-vaccine-table.component';

@Component({
  selector: 'app-report-vaccine',
  templateUrl: './report-vaccine.component.html',
  styleUrls: ['./report-vaccine.component.css']
})
export class ReportVaccineComponent implements OnInit {

  noResults$ = new Subject<boolean>();

  @ViewChild(ReportVaccineTableComponent) reportVaccineTable: ReportVaccineTableComponent;

  constructor(private title: Title) {
    title.setTitle("VAS-Report Vaccine")
    
  }

  ngOnInit(): void {
    
  }
  report = {
    type: null,
    begin: null,
    end: null,
    vaccineType: '',
    origin: null
  }

	applyFilter(event: Event) {
    this.reportVaccineTable.applyFilter(event); 
	}

  onFilter() {
    console.log(this.report);
  }
}
