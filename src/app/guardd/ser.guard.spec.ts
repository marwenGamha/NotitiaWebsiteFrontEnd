import { TestBed } from '@angular/core/testing';

import { SerGuard } from './ser.guard';

describe('SerGuard', () => {
  let guard: SerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
