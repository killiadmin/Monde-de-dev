import {ActivatedRoute} from '@angular/router';
import {Article} from '../../interfaces/models/article.model';
import {ArticleService} from '../../services/article.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './article_details.component.html',
  styleUrls: ['./article_details.component.scss']
})
export class Article_detailsComponent implements OnInit {
  article$!: Observable<Article>;
  articleId!: string;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    this.article$ = this.articleService.getArticle(this.articleId);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }
}
