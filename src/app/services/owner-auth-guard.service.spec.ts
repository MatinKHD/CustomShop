import { TestBed } from '@angular/core/testing';

import { OwnerAuthGuardService } from './owner-auth-guard.service';

describe('OwnerAuthGuardService', () => {
  let service: OwnerAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
