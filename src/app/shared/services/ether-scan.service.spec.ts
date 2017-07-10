import { TestBed, inject } from '@angular/core/testing';

import { EtherScanService } from './ether-scan.service';

describe('EtherScanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtherScanService]
    });
  });

  it('should be created', inject([EtherScanService], (service: EtherScanService) => {
    expect(service).toBeTruthy();
  }));
});
