import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineViewdetailComponent } from './vaccine-viewdetail.component';

describe('VaccineViewdetailComponent', () => {
  let component: VaccineViewdetailComponent;
  let fixture: ComponentFixture<VaccineViewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineViewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineViewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
