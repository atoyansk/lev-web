import { TestBed } from '@angular/core/testing';

import { CrudMethodsService } from './crud-methods.service';

describe('CrudMethodsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudMethodsService = TestBed.get(CrudMethodsService);
    expect(service).toBeTruthy();
  });
});
