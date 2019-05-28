import { TestBed } from '@angular/core/testing';

import { EditNoteService } from './edit-note.service';

describe('EditNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditNoteService = TestBed.get(EditNoteService);
    expect(service).toBeTruthy();
  });
});
