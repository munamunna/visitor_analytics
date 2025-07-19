import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  username: string;
  // optionally add exp, user_id, etc.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/token/';

  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8000/api/token/', { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access);
        const decoded = jwtDecode<JwtPayload>(response.access);
        localStorage.setItem('username', decoded.username);
      })
    );
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('username');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
