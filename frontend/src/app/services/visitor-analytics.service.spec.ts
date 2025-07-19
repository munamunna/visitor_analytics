import { TestBed } from '@angular/core/testing';

import { VisitorAnalyticsService } from './visitor-analytics.service';

describe('VisitorAnalyticsService', () => {
  let service: VisitorAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
