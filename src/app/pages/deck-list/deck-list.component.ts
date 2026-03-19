import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deck-list.component.html',
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  confirmDeleteId: number | null = null;

  constructor(
    private deckService: DeckService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.decks = this.deckService.getDecks();
  }

  /** Safe delete using deck.id, not array index */
  removeDeck(deckId: number): void {
    this.deckService.deleteDeck(deckId);
    this.decks = this.deckService.getDecks();
    this.confirmDeleteId = null;
    this.toast.show('Baralho removido com sucesso.', 'success');
  }

  requestDelete(deckId: number): void {
    this.confirmDeleteId = deckId;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  /** Returns a deduplicated list of types in the deck */
  getDeckTypes(deck: Deck): string[] {
    const types = new Set<string>(deck.cards.flatMap((c) => c.types || []));
    return Array.from(types).slice(0, 5);
  }

  getPokemonCount(deck: Deck): number {
    return deck.cards.filter((c) => c.supertype === 'Pokémon').length;
  }

  getTrainerCount(deck: Deck): number {
    return deck.cards.filter((c) => c.supertype === 'Trainer').length;
  }

  /** First 5 unique card images for the preview fan */
  getPreviewImages(deck: Deck): string[] {
    const seen = new Set<string>();
    const imgs: string[] = [];
    for (const card of deck.cards) {
      if (card.images?.small && !seen.has(card.images.small)) {
        seen.add(card.images.small);
        imgs.push(card.images.small);
        if (imgs.length >= 5) break;
      }
    }
    return imgs;
  }

  isValid(deck: Deck): boolean {
    return deck.cards.length >= 24 && deck.cards.length <= 60;
  }
}
