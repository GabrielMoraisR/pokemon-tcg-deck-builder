import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<{ data: Card[] }> {
    return this.http.get<{ data: Card[] }>(this.apiUrl);
  }
}
