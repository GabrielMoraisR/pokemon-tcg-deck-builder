import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Deck } from '../../models/card.model';
import { DeckService } from '../../services/deck.service';
import { PokemonTcgService } from '../../services/pokemon-tcg.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class DeckFormComponent implements OnInit {
  deckName: string = '';
  cards: any[] = [];
  deck: Deck | undefined;
  allCards: any[] = [];
  isEditRoute: boolean = false;
  deckId: number | null = null;
  isDeckNameDisabled: boolean = false;
  isLoading: boolean = true;
  loadError: boolean = false;

  // Search & filter state
  searchQuery: string = '';
  activeTypeFilter: string = 'all';

  // Counters
  pokemonCount: number = 0;
  trainerCount: number = 0;
  uniqueTypes: number = 0;

  constructor(
    private pokemonTcgService: PokemonTcgService,
    private deckService: DeckService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.pokemonTcgService.getCards().subscribe({
      next: (data) => {
        this.allCards = data.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar cartas:', err);
        this.isLoading = false;
        this.loadError = true;
        this.toast.show('Erro ao carregar cartas da API. Tente novamente.', 'error');
      },
    });

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

  /* ── Filtered cards shown in browser ────────── */
  get filteredCards(): any[] {
    let result = this.allCards;

    if (this.activeTypeFilter !== 'all') {
      result = result.filter((c) =>
        (c.types || []).some(
          (t: string) => t.toLowerCase() === this.activeTypeFilter
        )
      );
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.supertype || '').toLowerCase().includes(q) ||
          (c.types || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return result.slice(0, 60);
  }

  /* ── Available type filters ──────────────────── */
  get availableTypes(): string[] {
    const types = new Set<string>();
    this.allCards.forEach((c) =>
      (c.types || []).forEach((t: string) => types.add(t))
    );
    return Array.from(types).sort();
  }

  /* ── Deck stats ──────────────────────────────── */
  updateCounters() {
    this.pokemonCount = this.cards.filter(
      (card) => card.supertype === 'Pokémon'
    ).length;
    this.trainerCount = this.cards.filter(
      (card) => card.supertype === 'Trainer'
    ).length;
    const types = new Set(this.cards.flatMap((card) => card.types || []));
    this.uniqueTypes = types.size;
  }

  get deckProgress(): number {
    return Math.min((this.cards.length / 60) * 100, 100);
  }

  get progressClass(): string {
    if (this.cards.length === 0) return 'progress-empty';
    if (this.cards.length < 24) return 'progress-invalid';
    if (this.cards.length > 55) return 'progress-full';
    return 'progress-valid';
  }

  get deckValid(): boolean {
    return (
      this.deckName.trim() !== '' &&
      this.cards.length >= 24 &&
      this.cards.length <= 60
    );
  }

  /* ── Card count helpers ──────────────────────── */
  getCardCount(cardName: string): number {
    return this.cards.filter((c) => c.name === cardName).length;
  }

  isAtLimit(card: any): boolean {
    return this.getCardCount(card.name) >= 4;
  }

  /* ── Grouped view of deck cards ─────────────── */
  get groupedDeckCards(): { name: string; card: any; count: number }[] {
    const map = new Map<string, { card: any; count: number }>();
    for (const c of this.cards) {
      if (map.has(c.name)) {
        map.get(c.name)!.count++;
      } else {
        map.set(c.name, { card: c, count: 1 });
      }
    }
    return Array.from(map.entries()).map(([name, v]) => ({
      name,
      card: v.card,
      count: v.count,
    }));
  }

  /* ── Add card (click in browser) ─────────────── */
  addCardFromBrowser(card: any) {
    if (this.cards.length >= 60) {
      this.toast.show('Baralho cheio! Máximo de 60 cartas.', 'warning');
      return;
    }
    const added = this.deckService.addCardToDeck(this.cards, card);
    if (added) {
      this.updateCounters();
    } else {
      this.toast.show(`Limite de 4 cópias de "${card.name}" atingido.`, 'warning');
    }
  }

  /* ── Remove one copy of card from deck ────────── */
  removeOneCard(cardName: string) {
    const idx = this.cards.findIndex((c) => c.name === cardName);
    if (idx !== -1) {
      this.cards.splice(idx, 1);
      this.updateCounters();
    }
  }

  /* ── Remove ALL copies of card from deck ─────── */
  removeAllOfCard(cardName: string) {
    const before = this.cards.length;
    this.cards = this.cards.filter((c) => c.name !== cardName);
    const removed = before - this.cards.length;
    this.updateCounters();
    if (removed > 0) {
      this.toast.show(`"${cardName}" removido do baralho.`, 'info');
    }
  }

  /* ── Save deck ────────────────────────────────── */
  saveDeck() {
    if (!this.deckName.trim()) {
      this.toast.show('Dê um nome ao seu baralho antes de salvar.', 'warning');
      return;
    }
    if (this.cards.length < 24) {
      this.toast.show(`Adicione pelo menos ${24 - this.cards.length} carta(s) para completar o mínimo de 24.`, 'error');
      return;
    }
    if (this.cards.length > 60) {
      this.toast.show('Baralho com mais de 60 cartas. Remova o excesso.', 'error');
      return;
    }

    if (this.isEditRoute && this.deckId !== null) {
      this.deckService.updateDeck(this.deckId, this.deckName, [...this.cards]);
      this.toast.show('Baralho atualizado com sucesso!', 'success');
    } else {
      this.deckService.createDeck(this.deckName, [...this.cards]);
      this.toast.show('Baralho criado com sucesso!', 'success');
    }

    setTimeout(() => this.router.navigate(['/decks']), 600);
  }

  loadDeck() {
    if (this.deckId !== null) {
      const deck = this.deckService.getDeckById(this.deckId);
      if (deck) {
        this.deckName = deck.name;
        this.cards = [...deck.cards];
        this.updateCounters();
      }
    }
  }

  clearForm() {
    if (this.cards.length > 0) {
      this.cards = [];
      this.updateCounters();
      this.toast.show('Cartas removidas do baralho.', 'info');
    }
  }
}
