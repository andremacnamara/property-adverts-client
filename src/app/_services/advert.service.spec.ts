/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdvertService } from './advert.service';

describe('Service: Advert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertService]
    });
  });

  it('should ...', inject([AdvertService], (service: AdvertService) => {
    expect(service).toBeTruthy();
  }));
});
