import { Routes } from '@angular/router';
import { DeckDetailsComponent } from './pages/deck-details/deck-details.component';
import { DeckFormComponent } from './pages/deck-form/deck-form.component';
import { DeckListComponent } from './pages/deck-list/deck-list.component';

export const routes: Routes = [
  { path: 'decks', component: DeckListComponent },
  { path: 'create-deck', component: DeckFormComponent },
  { path: 'edit-deck/:id', component: DeckFormComponent },
  { path: 'deck-details/:id', component: DeckDetailsComponent },
  { path: '', redirectTo: '/decks', pathMatch: 'full' }
];
