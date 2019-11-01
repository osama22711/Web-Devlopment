import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResPage } from './test-res.page';

describe('TestResPage', () => {
  let component: TestResPage;
  let fixture: ComponentFixture<TestResPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestResPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
