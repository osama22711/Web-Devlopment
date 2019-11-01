import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AaPage } from './aa.page';

describe('AaPage', () => {
  let component: AaPage;
  let fixture: ComponentFixture<AaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
