import { TestBed } from '@angular/core/testing';

import { ImgixService } from './imgix.service';

describe('ImgixService', () => {
  let service: ImgixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
