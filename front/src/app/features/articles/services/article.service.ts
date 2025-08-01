import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticlesResponse} from '../interfaces/api/articlesResponse.interface';
import {Article} from "../interfaces/models/article.model";

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
}
