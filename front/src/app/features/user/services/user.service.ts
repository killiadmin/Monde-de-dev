import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersResponse} from '../interfaces/api/usersResponse.interface';
import {UpdateUserRequest} from '../interfaces/api/updateUserRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pathService = 'api/profil';

  constructor(private httpClient: HttpClient) { }

  public getAuthenticatedMe(): Observable<UsersResponse> {
    return this.httpClient.get<UsersResponse>(this.pathService);
  }

  public updateProfile(updateData: UpdateUserRequest): Observable<UsersResponse> {
    return this.httpClient.put<UsersResponse>(this.pathService, updateData);
  }
}
