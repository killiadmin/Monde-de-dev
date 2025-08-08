import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubscriptionResponse} from '../interfaces/api/SubscriptionResponse.interface';
import {ThemesResponse} from '../interfaces/api/themesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private pathService = 'api/themes';

  constructor(private httpClient: HttpClient) { }

  public getThemes(): Observable<ThemesResponse> {
    return this.httpClient.get<ThemesResponse>(this.pathService);
  }

  public subscribeToTheme(themId: number): Observable<SubscriptionResponse> {
    return this.httpClient.post<SubscriptionResponse>(this.pathService + "/subscribe", { themId });
  }

  public unsubscribeFromTheme(themId: number): Observable<SubscriptionResponse> {
    return this.httpClient.post<SubscriptionResponse>(this.pathService + "/unsubscribe", { themId });
  }

}
