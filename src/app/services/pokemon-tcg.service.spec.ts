import { TestBed } from '@angular/core/testing';

import { PokemonTcgService } from './pokemon-tcg.service';

describe('PokemonTcgService', () => {
  let service: PokemonTcgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonTcgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
