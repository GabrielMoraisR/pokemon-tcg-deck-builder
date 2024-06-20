import { Injectable } from '@angular/core';
import { Deck } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks: Deck[] = [];

  getDecks(): Deck[] {
    return this.decks;
  }

  addDeck(deck: Deck): void {
    this.decks.push(deck);
  }

  removeDeck(index: number): void {
    this.decks.splice(index, 1);
  }

  updateDeck(index: number, deck: Deck): void {
    this.decks[index] = deck;
  }
}
