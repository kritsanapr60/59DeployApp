import { TestBed } from '@angular/core/testing';

import { LineloginService } from './linelogin.service';

describe('LineloginService', () => {
  let service: LineloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
