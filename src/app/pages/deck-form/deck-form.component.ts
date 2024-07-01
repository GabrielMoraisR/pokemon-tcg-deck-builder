import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DeckFormComponent implements OnInit {
  deckName: string = '';
  selectedCard: string = '';
  selectedCardName: string = '';
  cards: any[] = [];
  deck: Deck | undefined;
  allCards: any[] = [];
  isEditRoute: boolean = false;
  deckId: number | null = null;
  isDeckNameDisabled: boolean = false;

  pokemonCount: number = 0;
  trainerCount: number = 0;
  uniqueTypes: number = 0;

  dropdownOpen: boolean = false;

  constructor(
    private pokemonTcgService: PokemonTcgService,
    private deckService: DeckService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pokemonTcgService.getCards().subscribe(
      (data) => {
        this.allCards = data.data;
      },
      (error) => {
        console.error('Erro ao buscar cartas:', error);
      }
    );

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.deckId = +id;
        this.isEditRoute = true;
        this.isDeckNameDisabled = true;
        this.loadDeck();
      }
    });

    this.updateCounters();
  }

  updateCounters() {
    this.pokemonCount = this.cards.filter(
      (card) => card.supertype === 'Pokémon'
    ).length;
    this.trainerCount = this.cards.filter(
      (card) => card.supertype === 'Trainer'
    ).length;
    const types = new Set(this.cards.flatMap((card) => card.types));
    this.uniqueTypes = types.size;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectCard(card: any) {
    this.selectedCard = card.id;
    this.selectedCardName = card.name;
    this.dropdownOpen = false;
  }

  addCard() {
    if (this.selectedCard) {
      const card = this.allCards.find((card) => card.id === this.selectedCard);
      if (card) {
        this.cards.push(card);
        this.selectedCard = '';
        this.selectedCardName = '';
        this.updateCounters();
      }
    }
  }

  removeCard(cardId: string) {
    this.cards = this.cards.filter((card) => card.id !== cardId);
    this.updateCounters();
  }

  saveDeck() {
    if (
      this.deckName.trim() !== '' &&
      this.cards.length >= 24 &&
      this.cards.length <= 60
    ) {
      if (this.isEditRoute && this.deckId !== null) {
        this.deckService.updateDeck(this.deckId, this.deckName, this.cards);
      } else {
        this.deckService.createDeck(this.deckName, this.cards);
      }
      this.clearForm();
      this.router.navigate(['/decks']);
    } else {
      alert('O baralho deve ter um nome e entre 24 e 60 cartas.');
    }
  }

  loadDeck() {
    if (this.deckId !== null) {
      const deck = this.deckService.getDeckById(this.deckId);
      if (deck) {
        this.deckName = deck.name;
        this.cards = deck.cards;
        this.updateCounters();
      }
    }
  }

  clearForm() {
    this.deckName = '';
    this.selectedCard = '';
    this.selectedCardName = '';
    this.cards = [];
    this.updateCounters();
  }
}
