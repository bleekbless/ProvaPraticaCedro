import { TestBed, inject } from '@angular/core/testing';

import { PratosService } from './pratos.service';

describe('PratosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PratosService]
    });
  });

  it('should ...', inject([PratosService], (service: PratosService) => {
    expect(service).toBeTruthy();
  }));
});
