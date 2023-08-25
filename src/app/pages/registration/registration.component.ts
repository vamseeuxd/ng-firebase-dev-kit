import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(public authService: AuthService) {}

  async createUserWithEmailAndPassword(email: string, password: string) {
    await this.authService.createUserWithEmailAndPassword(email, password);
  }
}
