
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionEmployeeComponent } from '../action-employee/action-employee.component';
import { ViewDetailEmployeeComponent } from '../view-detail-employee/view-detail-employee.component';
import { ToastrService } from 'ngx-toastr';
import { ErrorMess } from '../utils/ErrorMess';


@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = ['select', 'id', 'Name', 'Date of Birth', 'Gender', 'Phone', 'Address', 'Image'];
	selection = new SelectionModel<Employee>(true, []);
	dataSource: MatTableDataSource<Employee>;
	itemPerPage = 10;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private title: Title,
		private employeeService: EmployeeService,
		private router: Router,
		public dialog: MatDialog,
		private toastrService:ToastrService
	) {
		title.setTitle("VAS-Employee list")
	}

	ngAfterViewInit(): void {
	}

	ngOnInit(): void {
		this.employeeService.getAll().subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<Employee>(data);
			this.dataSource.paginator = this.paginator;
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim();
		this.dataSource.filterPredicate = (e, f) => { return (e.employeeId.includes(f) || e.employeeName.includes(f)) }
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
	checkboxLabel(row?: Employee): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
	}
	selectEntries(){
		this.paginator.pageSize = this.itemPerPage
		this.dataSource.paginator = this.paginator
	}

	getCreateEmployeePage() {
		this.router.navigate(['/employee-manage', 'create-employee']);
	}

	getUpdatePage() {
		if (this.selection.selected.length == 1) {
			this.router.navigate(['/employee-manage', 'update-employee', this.selection.selected[0].employeeId]);
		} else if (this.selection.selected.length == 0) {
			const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
				width: '400px',
				data: "You must select one employee to update"
			});
		} else {
			const dialogRef = this.dialog.open(ConfirmUpdateComponent, {
				width: '400px',
				data: "You cannot select more than two employees"
			});
		}
	}
	openConfirmDelete() {
		const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
			width: '400px',

		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const ids = this.selection.selected.map(e => e.employeeId);
				this.employeeService.deleteByIds(ids).subscribe(res => {
					window.location.reload()
				}, (err:any) => {
					this.toastrService.warning(ErrorMess.ACCESS_DENIED,"ACCESS DENIED",{timeOut:3000,progressBar:true})
				}, () => {
					//complete
				})

			}
		});
	}
	openModalViewDetail(empId) {
		const dialogRef = this.dialog.open(ViewDetailEmployeeComponent, {
			width: '60%',
			data: empId
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.router.navigate(['employee-manage','update-employee',result]);

			}
		});
	}

}
@Component({
	selector: 'app-confirm-delete',
	templateUrl: 'confirm-delete.html',
})
export class ConfirmDeleteComponent {

	constructor(
		public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	onCancelClick(): void {
		this.dialogRef.close();
	}
}

@Component({
	selector: 'app-confirm-update',
	templateUrl: 'confirm-update.html',
})
export class ConfirmUpdateComponent {
	constructor(
		public dialogRef: MatDialogRef<ConfirmUpdateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		console.log(data);
	}
	onCancelClick(): void {
		this.dialogRef.close();
	}
}
