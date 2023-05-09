import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEmployeeComponent } from './action-employee.component';

describe('ActionEmployeeComponent', () => {
  let component: ActionEmployeeComponent;
  let fixture: ComponentFixture<ActionEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
