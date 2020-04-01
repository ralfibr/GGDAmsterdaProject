import { TestBed } from '@angular/core/testing';

import { BarchartDataService } from './barchart-data.service';

describe('PiechartDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // Default test
  it('should be created', () => {
    const service: BarchartDataService = TestBed.get(BarchartDataService);
    expect(service).toBeTruthy();
  });
});
