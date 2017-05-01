import { TestBed, inject } from '@angular/core/testing';

import { RestaurantesService } from './restaurantes.service';

describe('RestaurantesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantesService]
    });
  });

  it('should ...', inject([RestaurantesService], (service: RestaurantesService) => {
    expect(service).toBeTruthy();
  }));
});
