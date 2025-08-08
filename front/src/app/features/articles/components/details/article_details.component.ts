import {ActivatedRoute} from '@angular/router';
import {Article} from '../../interfaces/models/article.model';
import {ArticleService} from '../../services/article.service';
import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NewComment} from '../../interfaces/api/new-comment.interface';
import {Observable, BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './article_details.component.html',
  styleUrls: ['./article_details.component.scss']
})
export class Article_detailsComponent implements OnInit {
  article$?: Observable<Article>;
  articleId: string = '';
  commentForm: FormGroup;

  private articleSubject = new BehaviorSubject<Article | null>(null);

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    this.article$ = this.articleSubject.asObservable().pipe(
      filter((article): article is Article => article !== null)
    );
    this.loadArticle();
  }

  onSubmitComment(): void {
    if (this.commentForm.valid) {
      const commentData: NewComment = {
        content: this.commentForm.get('content')?.value.trim()
      };

      this.articleService.newComment(this.articleId, commentData).subscribe({
        next: () => {
          this.commentForm.reset();
          this.loadArticle();
        }
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  private loadArticle(): void {
    this.articleService.getArticle(this.articleId).subscribe({
      next: (article) => {
        this.articleSubject.next(article);
      }
    });
  }
}
