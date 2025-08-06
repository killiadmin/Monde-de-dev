import {ArticleService} from '../../services/article.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewArticle} from '../../interfaces/api/new-article.interface';
import {Router} from '@angular/router';
import {ThemeService} from '../../../themes/services/theme.service';
import {Theme} from '../../../themes/interfaces/models/Theme.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  articleForm!: FormGroup;
  themes: Theme[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadThemes();
  }

  private initializeForm(): void {
    this.articleForm = this.fb.group({
      themeId: ['', Validators.required],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  private loadThemes(): void {
    this.themeService.getThemes().subscribe({
      next: (response) => {
        this.themes = response.themes;
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const newArticle: NewArticle = {
        title: this.articleForm.get('title')?.value,
        content: this.articleForm.get('content')?.value,
        themeId: this.articleForm.get('themeId')?.value
      };

      this.articleService.newArticle(newArticle).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        }
      });
    }
  }

  get title() {
    return this.articleForm.get('title');
  }

  get content() {
    return this.articleForm.get('content');
  }

  get themeId() {
    return this.articleForm.get('themeId');
  }
}
