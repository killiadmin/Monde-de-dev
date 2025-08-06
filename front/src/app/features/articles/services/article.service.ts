import {Article} from "../interfaces/models/article.model";
import {ArticlesResponse} from '../interfaces/api/articlesResponse.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NewArticle} from "../interfaces/api/new-article.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private pathService = 'api/articles';

  constructor(private httpClient: HttpClient) { }

  public getArticles(): Observable<ArticlesResponse> {
    return this.httpClient.get<ArticlesResponse>(this.pathService);
  }

  public getArticle(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/${id}`);
  }

  public newArticle(article: NewArticle): Observable<{message: string}> {
    return this.httpClient.post<{message: string}>(`${this.pathService}/new`, article);
  }
}
