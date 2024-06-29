import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'pokemon-tcg-deck-builder';

  constructor(private themeService: ThemeService) {
    this.themeService.setTheme('dark');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
