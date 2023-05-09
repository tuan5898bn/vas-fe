import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Report } from '../models/Report';
import { ReportService } from '../services/report.service';
import { VaccineService } from '../services/vaccine.service';

@Component({
  selector: 'app-report-vaccine-table',
  templateUrl: './report-vaccine-table.component.html',
  styleUrls: ['./report-vaccine-table.component.css']
})
export class ReportVaccineTableComponent implements OnInit {

  dataSource: MatTableDataSource<Report> = new MatTableDataSource<Report>([]);;
  displayedColumns: string[] = ['vaccineTypeId', 'vaccineTypeName', 'quantity', 'origin'];
  selection = new SelectionModel<Report>(true,[]);
  noResults$ = new Subject<boolean>();

  @ViewChild("pagging") paginator: MatPaginator;

  constructor(
    private title: Title,
    private reportService: ReportService,
    private router: Router,
    public dialog: MatDialog
  ) {
    title.setTitle("VAS-Vaccine List")
  }

  ngOnInit(): void {
    this.reportService.getReportVaccineByType().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<Report>(data);
      this.dataSource.paginator = this.paginator;
      console.log(data);
      
    })
  }

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim();
		this.dataSource.filterPredicate = (e, f) => { return (e.origin.includes(f)) }
		this.noResults$.next(
			this.dataSource.filteredData.length === 0
		);
	}

  moveToVaccinePage() {
    this.router.navigate(['vaccine-manage','create']);
  }

}
