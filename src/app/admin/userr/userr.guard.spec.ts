import { TestBed } from '@angular/core/testing';

import { UserrGuard } from './userr.guard';

describe('UserrGuard', () => {
  let guard: UserrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
