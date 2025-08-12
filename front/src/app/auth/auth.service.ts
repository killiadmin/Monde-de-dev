import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
}

interface LoginRequest {
  identifier: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private pathService = 'api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.pathService}/login`, loginData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/articles']);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.pathService}/register`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/articles']);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}
