import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/models/article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles_list.component.html',
  styleUrls: ['./articles_list.component.scss']
})
export class Articles_listComponent implements OnInit {
  articles: Article[] = [];
  isAsc = false;

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (response: { articles: Article[]; }) => {
        this.articles = response.articles;
        this.sortArticles();
      },
      error: (error: any) => {
        console.error('Error when loading articles : ', error);
      }
    });
  }

  toggleSort(): void {
    this.isAsc = !this.isAsc;
    this.sortArticles();
  }

  sortArticles(): void {
    this.articles.sort((begin, ending) => {
      const datebegin = new Date(begin.createdAt).getTime();
      const dateEnding = new Date(ending.createdAt).getTime();

      return this.isAsc ? datebegin - dateEnding : dateEnding - datebegin;
    });
  }

  goToDetails(articleId: number): void {
    this.router.navigate(['/articles/details', articleId]);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }
}
