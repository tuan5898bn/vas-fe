
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { VaccineType } from '../models/vaccine-type';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VaccineTypeService } from '../services/vaccine-type.service';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
	selector: 'app-vaccine-type-list',
	templateUrl: './vaccine-type-list.component.html',
	styleUrls: ['./vaccine-type-list.component.css']
})
export class VaccineTypeListComponent implements OnInit {


	displayedColumns: string[] = ['select', 'ID', 'VaccineTypeName', 'Discription', 'Status','Image'];
	selection = new SelectionModel<VaccineType>(true, []);
	dataSource: MatTableDataSource<VaccineType>;
	itemPerPage = 10;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private title: Title,
		private vaccineTypeService: VaccineTypeService,
		private router: Router,
		public dialog: MatDialog
	) {
		title.setTitle("VAS-Vaccine Type list")
	}

	ngAfterViewInit(): void {

	}

	ngOnInit(): void {
		this.getAllByStatus(true);
	}
	getAll(){
		this.vaccineTypeService.getAll().subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<VaccineType>(data);
			this.dataSource.paginator = this.paginator;
			this.selection.clear()

		})
	}
	getAllByStatus(b: boolean){
		this.vaccineTypeService.getAllByStatus(b).subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<VaccineType>(data);
			this.dataSource.paginator = this.paginator;
			this.selection.clear()
		})
	}

	viewDetail(vaccineType: VaccineType){
		const dialogRef=this.dialog.open(ViewDetailComponent, {
			width: '60%',
			data:vaccineType
		});
		
	}
	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
	selectEntries(){
		this.paginator.pageSize = this.itemPerPage;
		this.dataSource.paginator= this.paginator
			
	}
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource?.data.length;
		return numSelected === numRows;
	}
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: VaccineType): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}
	getCreateVaccineTypePage() {
		this.router.navigate(['/vaccine-type-manage', 'create-vaccine-type']);
	}
	makeInActive() {
		if(this.selection.selected.length>0){
			const in_ac = this.selection.selected.filter((val) => { return !val.status });
			if(in_ac.length>0){
				const dialogRef = this.dialog.open(HasInActiveComponent, {
					width: '400px',

				});
			}else{
				const dialogRef = this.dialog.open(ConfirmInActiveComponent, {
					width: '400px',

				});
				dialogRef.afterClosed().subscribe(result => {
					if (result) {
						const ids = this.selection.selected.map(v => v.id);
						this.vaccineTypeService.inActive(ids).subscribe(res => {
							window.location.reload()
						}, err => {

						}, () => {
							//complete
						})
					}
				});
			}

		}else{
			const dialogRef= this.dialog.open(NoDataSelectComponent,{
				width: '400px',
			});

		}

	}

}
@Component({
	selector: 'app-confirm-active',
	templateUrl: 'confirm-active.html',
})
export class ConfirmInActiveComponent {

	constructor(
		public dialogRef: MatDialogRef<ConfirmInActiveComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}
@Component({
	selector: 'app-nodata-select',
	templateUrl: 'nodata-select.html',
})
export class NoDataSelectComponent {

	constructor(
		public dialogRef: MatDialogRef<NoDataSelectComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}
@Component({
	selector: 'app-has-in-active',
	templateUrl: 'has-inactive.html',
})
export class HasInActiveComponent {

	constructor(
		public dialogRef: MatDialogRef<HasInActiveComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}




@Component({
	selector: 'app-view-detail',
	templateUrl: 'view-detail.html',
})
export class ViewDetailComponent {

	constructor(
		public dialogRef: MatDialogRef<ViewDetailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private router: Router
	) {
		
	}

	onCancelClick(): void {
		this.dialogRef.close();
	}
	goToUpdateVaccineType(id) {
		this.dialogRef.close();
		this.router.navigate(['/vaccine-type-manage', 'update-vaccine-type',id]);
    }

}
