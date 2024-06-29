import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: 'light' | 'dark' = 'dark';

  constructor() {
    this.setTheme(this.activeTheme);
  }

  setTheme(theme: 'light' | 'dark') {
    this.activeTheme = theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }

  toggleTheme() {
    this.setTheme(this.activeTheme === 'light' ? 'dark' : 'light');
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.activeTheme;
  }
}
