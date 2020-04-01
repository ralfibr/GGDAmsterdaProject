import { TestBed } from '@angular/core/testing';

import { QuestionsurveyDataService } from './questionsurvey-data.service';

describe('QuestionsurveyDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionsurveyDataService = TestBed.get(QuestionsurveyDataService);
    expect(service).toBeTruthy();
  });
});
