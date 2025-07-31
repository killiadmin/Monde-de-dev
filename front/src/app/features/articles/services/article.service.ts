import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleResponse} from '../interfaces/api/articlesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private pathService = 'api/articles';

  constructor(private httpClient: HttpClient) { }

  public getArticles(): Observable<ArticleResponse> {
    return this.httpClient.get<ArticleResponse>(this.pathService);
  }
}
