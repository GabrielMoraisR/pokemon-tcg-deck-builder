import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeckService } from '../../services/deck.service';
import { Deck } from '../../models/card.model';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.decks = this.deckService.getDecks();
  }

  removeDeck(index: number): void {
    this.deckService.removeDeck(index);
    this.decks = this.deckService.getDecks();
  }
}
