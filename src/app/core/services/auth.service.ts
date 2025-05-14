import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: any = null;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'admin') {
    this.user = { username, role: 'admin' };
    localStorage.setItem('user', JSON.stringify(this.user));
    return true;
  }
  return false;
}

setUser(user: any): void {
  this.user = user;
  localStorage.setItem('user', JSON.stringify(this.user));
}

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUser(): any {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
