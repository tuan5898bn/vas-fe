import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailNewsComponent } from './view-detail-news.component';

describe('ViewDetailNewsComponent', () => {
  let component: ViewDetailNewsComponent;
  let fixture: ComponentFixture<ViewDetailNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
