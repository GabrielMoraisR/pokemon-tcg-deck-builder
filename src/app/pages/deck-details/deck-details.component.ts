import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deck-details.component.html',
})
export class DeckDetailsComponent implements OnInit {
  deck: Deck | undefined;

  constructor(
    private route: ActivatedRoute,
    private deckService: DeckService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const deckId = +params['id']; // Fixed: use getDeckById instead of array index
      this.deck = this.deckService.getDeckById(deckId);
    });
  }

  get pokemonCount(): number {
    return this.deck?.cards.filter((c) => c.supertype === 'Pokémon').length || 0;
  }

  get trainerCount(): number {
    return this.deck?.cards.filter((c) => c.supertype === 'Trainer').length || 0;
  }

  get uniqueTypesCount(): number {
    const types = new Set(this.deck?.cards.flatMap((c) => c.types || []));
    return types.size;
  }

  get allTypes(): string[] {
    const types = new Set<string>(this.deck?.cards.flatMap((c) => c.types || []));
    return Array.from(types);
  }

  get isValid(): boolean {
    const len = this.deck?.cards.length || 0;
    return len >= 24 && len <= 60;
  }

  /** Cards grouped by supertype, deduplicated with count */
  get groupedCards(): { supertype: string; items: { card: any; count: number }[] }[] {
    if (!this.deck) return [];

    const groups: Record<string, Record<string, { card: any; count: number }>> = {};

    for (const card of this.deck.cards) {
      const st = card.supertype || 'Outros';
      if (!groups[st]) groups[st] = {};
      if (!groups[st][card.name]) {
        groups[st][card.name] = { card, count: 0 };
      }
      groups[st][card.name].count++;
    }

    // Desired order
    const order = ['Pokémon', 'Trainer', 'Energy', 'Outros'];
    return order
      .filter((st) => groups[st])
      .map((st) => ({
        supertype: st,
        items: Object.values(groups[st]),
      }));
  }
}
