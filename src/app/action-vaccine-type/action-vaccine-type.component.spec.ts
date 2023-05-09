import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionVaccineTypeComponent } from './action-vaccine-type.component';

describe('ActionVaccineTypeComponent', () => {
  let component: ActionVaccineTypeComponent;
  let fixture: ComponentFixture<ActionVaccineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionVaccineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionVaccineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
