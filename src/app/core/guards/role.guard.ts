import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.auth.getUser();
    const allowedRoles: string[] = route.data['roles'];
    if (!user || !allowedRoles.includes(user.role)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
