import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotesTagPage } from './add-notes-tag.page';

describe('AddNotesTagPage', () => {
  let component: AddNotesTagPage;
  let fixture: ComponentFixture<AddNotesTagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotesTagPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotesTagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
