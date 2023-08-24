import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Auth, User, user } from '@angular/fire/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  constructor(private router: Router) {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      if (!user) {
        this.router.navigate(['login']);
      }
    });
  }

  async signInWithGmail() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
      alert('Error while signInWithGmail');
    }
  }

  async signOut() {
    const isConfirm = confirm('Are you sure! Do you want to logout?');
    if (isConfirm) {
      try {
        await this.auth.signOut();
        this.router.navigate(['login']);
      } catch (error) {
        alert('Error while signOut');
      }
    }
  }

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.user$.pipe(
      map(user => {
        return !!user;
      })
    );
  }
}
