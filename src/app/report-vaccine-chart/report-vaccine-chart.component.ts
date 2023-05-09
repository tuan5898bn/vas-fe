import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import { ReportVaccineType } from '../models/ReportVaccineType';
import { ReportService } from '../services/report.service';


@Component({
	selector: 'app-report-vaccine-chart',
	templateUrl: './report-vaccine-chart.component.html',
	styleUrls: ['./report-vaccine-chart.component.css']
})
export class ReportVaccineChartComponent implements OnInit, AfterViewInit {



	constructor(
		private reportService: ReportService
	) {

	}
	ngAfterViewInit(): void {

	}

	backgroundColor: string[] = [
		"rgba(255, 99, 132, 0.2)",
		"rgba(255, 159, 64, 0.2)",
		"rgba(255, 205, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(54, 162, 235, 0.2)",
		"rgba(153, 102, 255, 0.2)",
		"rgba(201, 203, 207, 0.2)",
		"rgba(255, 99, 132, 0.2)",
		"rgba(255, 205, 86, 0.2)",
		"rgba(75, 192, 192, 0.2)",
		"rgba(201, 203, 207, 0.2)",
		"rgba(75, 192, 192, 0.2)",
	]
	ngOnInit(): void {
		this.reportService.getReportChart().subscribe((res: ReportVaccineType[]) => {
			const listVaccineTypeName = res.map(c => c.vaccineTypeName);
			const listNumberOfVaccine = res.map(c => c.numberOfVaccine);
			this.initChart(listVaccineTypeName, listNumberOfVaccine)
		})
	}
	initChart(a, b) {
		let canvas: any = document.getElementById('myChart');
		canvas.height = 100;
		const ctx = canvas.getContext('2d');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: [...a],
				datasets: [{
					label: "Vaccine Type",
					backgroundColor: [
						...this.backgroundColor
					],
					borderColor: "rgba(255,99,132,1)",
					borderWidth: '1',
					data: [...b]
				}]
			},
			options: {
				legend: { display: false }
			}
		});
	}

}
