import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Category2Component } from './category2.component';

describe('Category2Component', () => {
  let component: Category2Component;
  let fixture: ComponentFixture<Category2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Category2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Category2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
