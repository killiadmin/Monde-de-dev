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
      },
      error: (error: any) => {
        console.error('Error when loading articles : ', error);
      }
    });
  }

  goToDetails(articleId: number): void {
    this.router.navigate(['/articles/details', articleId]);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }
}
