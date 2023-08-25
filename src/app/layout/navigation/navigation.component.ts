import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  menuBeforeLogin = ['login', 'registration'];
  menuAfterLogin = [
    'franchise',
    'brachces',
    'products',
    'prices',
    'inventory',
    'sales',
    'vendors',
    'cutomers',
    'order-taking',
  ];

  menu$ = combineLatest(
    this.authService.user$,
    of(this.menuBeforeLogin),
    of(this.menuAfterLogin)
  ).pipe(
    map(([user, menuBeforeLogin, menuAfterLogin]) => {
      return user ? menuAfterLogin : menuBeforeLogin;
    })
  );

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(public authService: AuthService) {}
}
