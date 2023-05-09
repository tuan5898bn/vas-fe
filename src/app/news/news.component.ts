
import { AfterViewInit, Inject, Component, OnInit, ViewChild, PipeTransform, Pipe } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Title } from '@angular/platform-browser';
import { NewsService } from '../services/news.service';
import { News } from '../models/News';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDeleteComponent, ConfirmUpdateComponent } from '../employee-list/employee-list.component';
import { Subject } from 'rxjs';
import { ViewDetailNewsComponent } from '../view-detail-news/view-detail-news.component';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

	displayedColumns: string[] = ['select', 'title', 'postdate', 'preview'];
	selection = new SelectionModel<News>(true, []);
	dataSource: MatTableDataSource<News>;
	noResults$ = new Subject<boolean>();

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private title: Title,
		private newsService: NewsService,
		private router: Router,
		public dialog: MatDialog,
		private actRoute: ActivatedRoute,
	) {
		title.setTitle("VAS-News List")
	}

	ngAfterViewInit(): void {

	}

	newsId: string;
	news: News;
	res: any;
	Title: any;
	Content: any;
	PostDate: any;
	Preview: any;

	ngOnInit(): void { 
		this.newsId = this.actRoute.snapshot.paramMap.get('id')
		this.GetcontentById(this.newsId);
		this.newsService.getAll().subscribe((data: any) => {
			this.dataSource = new MatTableDataSource<News>(data);
			this.dataSource.paginator = this.paginator;
		})
	}

	GetcontentById(id: string) {
		this.newsService.getById(id).subscribe((data: any) => {
			this.res = data;
			this.Title = this.res.title
			this.Content = this.res.content
			this.PostDate = this.res.postDate
			this.Preview = this.res.preview
			console.log(this.res);
		});
	}

	getUpdateNewsPage() {
		this.router.navigate(['/news', 'update-news']);
	}

	getCreateNewsPage() {
		this.router.navigate(['/news', 'create-news']);
	}

	UpdateNewsPage(news: News): void {
		this.router.navigate(['/news', 'update-news']);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim();
		this.dataSource.filterPredicate = (e, f) => { return (e.id.includes(f) || e.title.includes(f)) }
		this.noResults$.next(
			this.dataSource.filteredData.length === 0
		);
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
	checkboxLabel(row?: News): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
	}

	openConfirmDelete() {
		const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
			width: '400px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				const ids = this.selection.selected.map(e => e.id);
				this.newsService.deleteByIds(ids).subscribe(res => {
					window.location.reload()
				}, err => {

				}, () => {
					//complete
				})

			}
		});
	}

	getUpdatePage() {
		if (this.selection.selected.length == 1) {
			this.router.navigate(['/news', 'update-news', this.selection.selected[0].id]);
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

	openModalViewDetail(empId) {
		const dialogRef = this.dialog.open(ViewDetailNewsComponent, {
			width: '80%',
			data: empId
		}); 
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.router.navigate(['news','update-news',result]);
				
			}
		});
	}
}
