/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, User, UserCredential, user } from '@angular/fire/auth';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { ConfirmService } from '../confirm/confirm.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  user: User | null = null;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private confirmService: ConfirmService,
    public loaderService: LoaderService
  ) {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      this.user = user;
      if (!user) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['franchise']);
      }
    });
  }

  async signInWithGmail(): Promise<string | UserCredential> {
    const loaderId = this.loaderService.show();
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      this.loaderService.hide(loaderId);
      return userCredential;
    } catch (error: any) {
      this.loaderService.hide(loaderId);
      alert(error.message);
      return error.message;
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const loaderId = this.loaderService.show();
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        this.loaderService.hide(loaderId);
        alert(
          `Your email is not verfied! an Email sent to ${userCredential.user.email} for Email Verification, Please complete your Email Verification`
        );
      } else {
        this.loaderService.hide(loaderId);
      }
    } catch (error: any) {
      this.loaderService.hide(loaderId);
      alert(error.message);
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const loaderId = this.loaderService.show();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        this.loaderService.hide(loaderId);
        alert(
          `Email sent to ${userCredential.user.email} for Email Verification, Please complete your Email Verification`
        );
      } else {
        this.loaderService.hide(loaderId);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async signOut() {
    const loaderId = this.loaderService.show();
    const isConfirm = await this.confirmService.confirm(
      'Logout Confirmation',
      'Are you sure! Do you want to logout?'
    );
    /*
    const isConfirm = confirm('Are you sure! Do you want to logout?');
    */
    if (isConfirm) {
      try {
        await this.auth.signOut();
        this.loaderService.hide(loaderId);
        this.router.navigate(['login']);
      } catch (error) {
        this.loaderService.hide(loaderId);
        alert('Error while signOut');
      }
    } else {
      this.loaderService.hide(loaderId);
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
