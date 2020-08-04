import { TestBed } from '@angular/core/testing';

import { ScrollnavService } from './scrollnav.service';

describe('ScrollnavService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollnavService = TestBed.get(ScrollnavService);
    expect(service).toBeTruthy();
  });
});
