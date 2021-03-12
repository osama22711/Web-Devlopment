import { TestBed } from '@angular/core/testing';

import { VirtualClassService } from './virtual-class.service';

describe('VirtualClassService', () => {
  let service: VirtualClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
