import { TestBed, inject } from '@angular/core/testing';

import { BlockCypherService } from './block-cypher.service';

describe('BlockCypherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockCypherService]
    });
  });

  it('should be created', inject([BlockCypherService], (service: BlockCypherService) => {
    expect(service).toBeTruthy();
  }));
});
