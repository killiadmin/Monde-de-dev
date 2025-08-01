import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {Theme} from "../../interfaces/models/Theme.model";

@Component({
  selector: 'app-themes',
  templateUrl: './themes_list.component.html',
  styleUrls: ['./themes_list.component.scss']
})
export class Themes_ListComponent implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getThemes().subscribe({
      next: (response: { themes: Theme[]; }) => {
        this.themes = response.themes;
      },
      error: (error: any) => {
        console.error('Error when loading themes : ', error);
      }
    })
  }
}
