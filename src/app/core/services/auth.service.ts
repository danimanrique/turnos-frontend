import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../models';
import { API_BASE_URL } from '../api.config';

interface LoginResponse {
  access_token: string;
  user: Usuario;
}

interface RegisterResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'turnero_token';
  private readonly userKey = 'turnero_user';

  private readonly tokenSignal = signal<string | null>(
    typeof localStorage !== 'undefined' ? localStorage.getItem(this.tokenKey) : null,
  );
  private readonly userSignal = signal<Usuario | null>(
    typeof localStorage !== 'undefined'
      ? this.parseUser(localStorage.getItem(this.userKey))
      : null,
  );

  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly user = computed(() => this.userSignal());

  constructor(private readonly http: HttpClient) {}

  async login(email: string, password: string): Promise<void> {
    const res = await firstValueFrom(
      this.http.post<LoginResponse>(`${API_BASE_URL}/auth/login`, { email, password }),
    );
    this.setSession(res.access_token, res.user);
  }

  async register(payload: {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    return firstValueFrom(
      this.http.post<RegisterResponse>(`${API_BASE_URL}/auth/register`, payload),
    );
  }

  logout(): void {
    this.setSession(null, null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private setSession(token: string | null, user: Usuario | null) {
    this.tokenSignal.set(token);
    this.userSignal.set(user);
    if (typeof localStorage === 'undefined') {
      return;
    }
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.userKey);
    }
  }

  private parseUser(value: string | null): Usuario | null {
    if (!value) return null;
    try {
      return JSON.parse(value) as Usuario;
    } catch {
      return null;
    }
  }
}
