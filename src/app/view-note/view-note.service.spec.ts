import { TestBed } from '@angular/core/testing';

import { ViewNoteService } from './view-note.service';

describe('ViewNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewNoteService = TestBed.get(ViewNoteService);
    expect(service).toBeTruthy();
  });
});
