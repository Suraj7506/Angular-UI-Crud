import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-profile-management';
    constructor(private authService: AuthService) {
    }

    get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


}
