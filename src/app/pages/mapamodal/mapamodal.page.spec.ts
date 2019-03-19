import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapamodalPage } from './mapamodal.page';

describe('MapamodalPage', () => {
  let component: MapamodalPage;
  let fixture: ComponentFixture<MapamodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapamodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapamodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
