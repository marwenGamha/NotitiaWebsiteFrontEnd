import { TestBed } from '@angular/core/testing';

import { ValeurGuard } from './valeur.guard';

describe('ValeurGuard', () => {
  let guard: ValeurGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValeurGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
