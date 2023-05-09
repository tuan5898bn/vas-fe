import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineActionComponent } from './vaccine-action.component';

describe('VaccineActionComponent', () => {
  let component: VaccineActionComponent;
  let fixture: ComponentFixture<VaccineActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
