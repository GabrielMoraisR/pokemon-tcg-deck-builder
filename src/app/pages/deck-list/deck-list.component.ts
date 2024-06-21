import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deck-list.component.html'
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.decks = this.deckService.getDecks();
  }

  removeDeck(index: number): void {
    this.deckService.deleteDeck(index);
    this.decks = this.deckService.getDecks();
  }
}
