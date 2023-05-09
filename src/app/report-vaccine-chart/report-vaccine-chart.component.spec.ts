import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVaccineChartComponent } from './report-vaccine-chart.component';

describe('ReportVaccineChartComponent', () => {
  let component: ReportVaccineChartComponent;
  let fixture: ComponentFixture<ReportVaccineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVaccineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVaccineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
