import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = [window.location.origin, 'api'].join('/');

  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/token`, data)
      .pipe(tap((result) => {}));
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  constructor() { }
}
