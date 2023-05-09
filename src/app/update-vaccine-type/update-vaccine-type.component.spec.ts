import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVaccineTypeComponent } from './update-vaccine-type.component';

describe('UpdateVaccineTypeComponent', () => {
  let component: UpdateVaccineTypeComponent;
  let fixture: ComponentFixture<UpdateVaccineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVaccineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVaccineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
