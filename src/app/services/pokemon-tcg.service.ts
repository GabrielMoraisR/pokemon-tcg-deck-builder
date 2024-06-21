import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  getCards(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
