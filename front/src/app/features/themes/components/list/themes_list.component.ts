import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {Theme} from "../../interfaces/models/Theme.model";

@Component({
  selector: 'app-themes',
  templateUrl: './themes_list.component.html',
  styleUrls: ['./themes_list.component.scss']
})

export class Themes_listComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe({
      next: (response: { themes: Theme[]; }) => {
        this.themes = response.themes;
      }
    })
  }

  subscribeToTheme(themeId: number): void {
    this.themeService.subscribeToTheme(themeId).subscribe({
      next: () => {
        this.updateThemeSubscriptionStatus(themeId, true);
      }
    });
  }

  private updateThemeSubscriptionStatus(themeId: number, isSubscribed: boolean): void {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      theme.isSubscribed = isSubscribed;
    }
  }
}
