import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Vaccine } from '../models/Vaccine';
import { VaccineService } from '../services/vaccine.service';
import { VaccineViewdetailComponent } from '../vaccine-viewdetail/vaccine-viewdetail.component';

@Component({
	selector: 'app-vaccine-list',
	templateUrl: './vaccine-list.component.html',
	styleUrls: ['./vaccine-list.component.css']
})

export class VaccineListComponent implements OnInit {

	dataSource: MatTableDataSource<Vaccine> = new MatTableDataSource<Vaccine>([]);;
	displayedColumns: string[] = ['select', 'vaccineId', 'vaccineName', 'vaccineType', 'numberOfInjection', 'origin', 'status'];
	selection = new SelectionModel<Vaccine>(true, []);
	noResults$ = new Subject<boolean>();
	itemPerPage = 10;

	@ViewChild("pagging") paginator: MatPaginator;
	successStatus: string;
	constructor(
		private title: Title,
		private vaccineService: VaccineService,
		private router: Router,
		public dialog: MatDialog,
		private route: ActivatedRoute
	) {
		title.setTitle("VAS-Vaccine List")
	}

	ngOnInit(): void {
		this.successStatus = this.route.snapshot.queryParamMap.get('status');
		this.getAllByStatus(true);
	}

	getAll() {
		this.vaccineService.getAllVaccines().subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<Vaccine>(data);
			this.dataSource.paginator = this.paginator;
			this.selection.clear()
		})
	}

	getAllByStatus(b: boolean) {
		this.vaccineService.getVaccineByStatus(b).subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<Vaccine>(data);
			this.dataSource.paginator = this.paginator;
			this.selection.clear()
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		// this.dataSource.filter = filterValue.trim().toLowerCase();
		this.dataSource.filter = filterValue.trim();
		this.dataSource.filterPredicate = (e, f) => { return (e.vaccineID.includes(f) || e.name.includes(f)) }
		this.noResults$.next(
			this.dataSource.filteredData.length === 0
		);
	}
	selectEntries() {
		this.paginator.pageSize= this.itemPerPage;
		this.dataSource.paginator= this.paginator
	}
	moveToVaccinePage() {
		this.router.navigate(['vaccine-manage', 'create']);
	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: Vaccine): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
	}

	moveToUpdateVaccinePage() {
		if (this.selection.selected.length == 1) {
			if (this.selection.selected[0].active == false) {
				const dialogRef = this.dialog.open(ConfirmUpdatePage, {
					width: '400px',
					data: "Can't update vaccine with in-active status"
				});
			} else {
				this.router.navigate(['/vaccine-manage', 'update', this.selection.selected[0].vaccineID]);
			}

		} else if (this.selection.selected.length == 0) {
			const dialogRef = this.dialog.open(ConfirmUpdatePage, {
				width: '400px',
				data: "You must select one vaccine to update"
			});
		} else {
			const dialogRef = this.dialog.open(ConfirmUpdatePage, {
				width: '400px',
				data: "You cannot select more than two vaccines"
			});
		}
	}

	makeInactive() {
		if (this.selection.selected.length == 0) {
			const dialogRef = this.dialog.open(ConfirmUpdatePage, {
				width: '400px',
				data: "No data to make inactive!"
			});
		} else if (this.selection.selected[0].active == false) {
			const dialogRef = this.dialog.open(ConfirmUpdatePage, {
				width: '400px',
				data: "Invalid data - please recheck your selects!"
			});
		} else {
			const dialogRef = this.dialog.open(ConfirmInactiveComponent, {
				width: '400px'
			});
			dialogRef.afterClosed().subscribe(result => {
				if (result) {
					const ids = this.selection.selected.map(e => e.vaccineID);
					this.vaccineService.updateStatus(ids).subscribe(res => {
						window.location.reload()
					}, err => {
						console.log(err);
					})
				}
			});
		}
	}

	viewVaccineDetail(vaccineID) {
		const dialogRef = this.dialog.open(VaccineViewdetailComponent, {
			width: '80%',
			data: vaccineID
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.router.navigate(['/vaccine-manage', 'update', result]);
			}
		})
	}
}

@Component({
	selector: 'app-confirm-inactive',
	templateUrl: 'confirm-inactive.html'
})
export class ConfirmInactiveComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmInactiveComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}

@Component({
	selector: 'app-confirm-updatepage',
	templateUrl: 'confirm-updatepage.html'
})
export class ConfirmUpdatePage {
	constructor(
		public dialogRef: MatDialogRef<ConfirmInactiveComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}

