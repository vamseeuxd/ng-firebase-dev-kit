/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, User, user } from '@angular/fire/auth';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

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
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        alert(
          `Your email is not verfied! an Email sent to ${userCredential.user.email} for Email Verification, Please complete your Email Verification`
        );
      }
      console.log(userCredential);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        alert(
          `Email sent to ${userCredential.user.email} for Email Verification, Please complete your Email Verification`
        );
      }
      console.log(userCredential);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
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
