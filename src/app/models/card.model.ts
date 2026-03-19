export interface Card {
  id: string;
  name: string;
  supertype: string;
  types: string[];
  images?: {
    small: string;
    large: string;
  };
}

export interface Deck {
  id: number;
  name: string;
  cards: Card[];
}
