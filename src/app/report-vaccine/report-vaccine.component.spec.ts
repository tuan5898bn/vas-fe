import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVaccineComponent } from './report-vaccine.component';

describe('ReportVaccineComponent', () => {
  let component: ReportVaccineComponent;
  let fixture: ComponentFixture<ReportVaccineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVaccineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
