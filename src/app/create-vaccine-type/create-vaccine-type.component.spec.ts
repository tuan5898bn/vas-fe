import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVaccineTypeComponent } from './create-vaccine-type.component';

describe('CreateVaccineTypeComponent', () => {
  let component: CreateVaccineTypeComponent;
  let fixture: ComponentFixture<CreateVaccineTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVaccineTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVaccineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
