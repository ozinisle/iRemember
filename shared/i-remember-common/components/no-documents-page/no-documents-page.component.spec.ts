import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDocumentsPagePage } from './no-documents-page.page';

describe('NoDocumentsPagePage', () => {
  let component: NoDocumentsPagePage;
  let fixture: ComponentFixture<NoDocumentsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDocumentsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDocumentsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
