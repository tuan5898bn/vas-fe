import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVaccineTableComponent } from './report-vaccine-table.component';

describe('ReportVaccineTableComponent', () => {
  let component: ReportVaccineTableComponent;
  let fixture: ComponentFixture<ReportVaccineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVaccineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVaccineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
