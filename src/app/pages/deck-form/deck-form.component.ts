import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeckService } from '../../services/deck.service';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DeckFormComponent implements OnInit {
  deckName: string = '';
  selectedCard: string = '';
  cards: any[] = [];
  allCards: any[] = [];

  constructor(
    private pokemonTcgService: PokemonTcgService,
    private deckService: DeckService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonTcgService.getCards().subscribe(
      (data) => {
        console.log('Cards data:', data);
        this.allCards = data.data;
      },
      (error) => {
        console.error('Erro ao buscar cartas:', error);
      }
    );
  }

  addCard() {
    if (this.selectedCard) {
      const card = this.allCards.find((card) => card.id === this.selectedCard);
      if (card) {
        this.cards.push(card);
        this.selectedCard = '';
      }
    }
  }

  createDeck() {
    if (
      this.deckName.trim() !== '' &&
      this.cards.length >= 24 &&
      this.cards.length <= 60
    ) {
      this.deckService.createDeck(this.deckName, this.cards);
      this.clearForm();
      this.router.navigate(['/decks']);
    } else {
      alert('O baralho deve ter um nome e entre 24 e 60 cartas.');
    }
  }

  clearForm() {
    this.deckName = '';
    this.selectedCard = '';
    this.cards = [];
  }
}
