import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InituserPage } from './inituser.page';

describe('InituserPage', () => {
  let component: InituserPage;
  let fixture: ComponentFixture<InituserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InituserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InituserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
