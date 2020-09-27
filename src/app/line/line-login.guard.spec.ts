import { TestBed } from '@angular/core/testing';

import { LineLoginGuard } from './line-login.guard';

describe('LineLoginGuard', () => {
  let guard: LineLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LineLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
