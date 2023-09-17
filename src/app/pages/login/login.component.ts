import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public authService: AuthService) {}

  async signInWithGmail() {
    await this.authService.signInWithGmail();
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    await this.authService.signInWithEmailAndPassword(email, password);
  }
}
