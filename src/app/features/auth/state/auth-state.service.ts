import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private readonly TOKEN_KEY = 'accessToken';
  private readonly token: WritableSignal<string | null> = signal<string | null>(this.getTokenFromStorage());
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public login(email: string): Observable<void> {
    return this.authService.login(email).pipe(
      tap(res => this.setToken(res.accessToken)),
      map(() => void 0)
    );
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  public isLoggedIn = computed(() => {
    const token = this.token();
    return !!token && !this.isTokenExpired(token);
  });

  public getToken(): string | null {
    return this.token();
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.token.set(token);
  }

  public isTokenExpired(token: string): boolean {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const exp = decodedPayload.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (e) {
      console.error('Error decoding token:', e);
      return true;
    }
  }

  private getTokenFromStorage(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token && !this.isTokenExpired(token)) {
      return token;
    }
    return null;
  }
}
