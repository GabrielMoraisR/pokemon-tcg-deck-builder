import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ThemeService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'pokemon-tcg-deck-builder';

  constructor(private themeService: ThemeService) {
    this.themeService.setTheme('dark');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }
}
