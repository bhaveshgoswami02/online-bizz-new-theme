import { TestBed } from '@angular/core/testing';

import { SuperCategoriesService } from './super-categories.service';

describe('SuperCategoriesService', () => {
  let service: SuperCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
