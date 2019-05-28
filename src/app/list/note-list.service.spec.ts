import { TestBed } from '@angular/core/testing';

import { NoteListService } from './note-list.service';

describe('NoteListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteListService = TestBed.get(NoteListService);
    expect(service).toBeTruthy();
  });
});
