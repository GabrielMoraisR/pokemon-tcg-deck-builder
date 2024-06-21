import { Injectable } from '@angular/core';

export interface DeckServiceInterface {
  createDeck(name: string, cards: any[]): void;
  addCardToDeck(deck: any[], card: any): boolean;
  removeCardFromDeck(deck: any[], card: any): void;
  getDeckByName(name: string): any;
  getDecks(): { id: number; name: string; cards: any[] }[];
  deleteDeck(id: number): void;
  getDeckById(id: number): any;
  updateDeck(id: number, name: string, cards: any[]): void;
}

@Injectable({
  providedIn: 'root',
})
export class DeckService implements DeckServiceInterface {
  private decks: { id: number; name: string; cards: any[] }[] = [];

  constructor() {}

  createDeck(name: string, cards: any[]) {
    const newDeck = {
      id: this.decks.length + 1,
      name,
      cards,
    };
    this.decks.push(newDeck);
  }

  addCardToDeck(deck: any[], card: any): boolean {
    const count = deck.filter((c) => c.name === card.name).length;
    if (count < 4) {
      deck.push(card);
      return true;
    } else {
      return false;
    }
  }

  removeCardFromDeck(deck: any[], card: any) {
    const index = deck.findIndex((c) => c.name === card.name);
    if (index !== -1) {
      deck.splice(index, 1);
    }
  }

  getDeckByName(name: string): any {
    return this.decks.find((deck) => deck.name === name);
  }

  getDecks(): { id: number; name: string; cards: any[] }[] {
    return this.decks;
  }

  deleteDeck(id: number): void {
    this.decks = this.decks.filter((deck) => deck.id !== id);
  }

  getDeckById(id: number): any {
    return this.decks.find((deck) => deck.id === id);
  }

  updateDeck(id: number, name: string, cards: any[]): void {
    const deck = this.getDeckById(id);
    if (deck) {
      deck.name = name;
      deck.cards = cards;
    }
  }
}
