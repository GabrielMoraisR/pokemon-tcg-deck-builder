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
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const deckIndex = params['id'];
      this.deck = this.deckService.getDecks()[deckIndex];
    });
  }

  getPokemonCount(): number {
    return this.deck?.cards.filter(card => card.supertype === 'Pokémon').length || 0;
  }

  getTrainerCount(): number {
    return this.deck?.cards.filter(card => card.supertype === 'Trainer').length || 0;
  }

  getUniqueTypes(): number {
    const types = new Set(this.deck?.cards.flatMap(card => card.types));
    return types.size;
  }
}
