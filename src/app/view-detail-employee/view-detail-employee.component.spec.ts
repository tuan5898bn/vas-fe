import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailEmployeeComponent } from './view-detail-employee.component';

describe('ViewDetailEmployeeComponent', () => {
  let component: ViewDetailEmployeeComponent;
  let fixture: ComponentFixture<ViewDetailEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
