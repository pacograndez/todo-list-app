import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }

  public login(email: string): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>(`${environment.urlApi}/auth/login`, email);
  }
}
