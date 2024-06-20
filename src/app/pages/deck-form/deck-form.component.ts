import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Card, Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';

@Component({
  selector: 'app-deck-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css']
})
export class DeckFormComponent implements OnInit {
  deck: Deck = { name: '', cards: [] };
  cards: Card[] = [];
  isEditMode: boolean = false;
  deckIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonTcgService: PokemonTcgService,
    private deckService: DeckService
  ) { }

  ngOnInit(): void {
    this.pokemonTcgService.getCards().subscribe(response => {
      this.cards = response.data;
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.deckIndex = params['id'];
        this.deck = this.deckService.getDecks()[this.deckIndex];
      }
    });
  }

  addCardToDeck(card: Card): void {
    if (this.deck.cards.length < 60) {
      const cardCount = this.deck.cards.filter(c => c.name === card.name).length;
      if (cardCount < 4) {
        this.deck.cards.push(card);
      }
    }
  }

  removeCardFromDeck(index: number): void {
    this.deck.cards.splice(index, 1);
  }

  saveDeck(): void {
    if (this.deck.cards.length >= 24 && this.deck.cards.length <= 60) {
      if (this.isEditMode) {
        this.deckService.updateDeck(this.deckIndex, this.deck);
      } else {
        this.deckService.addDeck(this.deck);
      }
      this.router.navigate(['/decks']);
    }
  }
}
