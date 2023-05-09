import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccienImportComponent } from './vaccien-import.component';

describe('VaccienImportComponent', () => {
  let component: VaccienImportComponent;
  let fixture: ComponentFixture<VaccienImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccienImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccienImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
