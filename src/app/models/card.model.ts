export interface Card {
  id: string;
  name: string;
  supertype: string;
  types: string[];
}

export interface Deck {
  name: string;
  cards: Card[];
}
