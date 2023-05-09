import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateNewsComponent } from './create-update-news.component';

describe('CreateUpdateNewsComponent', () => {
  let component: CreateUpdateNewsComponent;
  let fixture: ComponentFixture<CreateUpdateNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
