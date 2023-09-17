import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { ITile } from '../../pages/landing/landing.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  menuBeforeLogin = [
    {
      icon: 'login',
      description: '',
      title: 'Login',
      id: 'login',
    },
    {
      icon: 'add_card',
      description: 'allows to add, remove or Update Franchise',
      title: 'Registration',
      id: 'registration',
    },
  ];

  menuAfterLogin: ITile[] = [
    {
      icon: 'grid_on',
      description: '',
      title: 'Landing',
      id: 'landing',
    },
    {
      icon: 'domain',
      description: 'allows to add, remove or Update Franchise',
      title: 'Franchise',
      id: 'franchise',
    },
    {
      icon: 'location_city',
      description: 'allows to add, remove or Update Brachces',
      title: 'Brachces',
      id: 'brachces',
    },
    {
      icon: 'apps',
      description: 'allows to add, remove or Update Products',
      title: 'Products',
      id: 'products',
    },
    {
      icon: 'money',
      description: 'allows to add, remove or Update Prices',
      title: 'Prices',
      id: 'prices',
    },
    {
      icon: 'list',
      description: 'allows to add, remove or Update Inventory',
      title: 'Inventory',
      id: 'inventory',
    },
    {
      icon: 'shopping_cart',
      description: 'displays DSR or Sales Details by Start & End Date',
      title: 'Sales',
      id: 'sales',
    },
    {
      icon: 'supervisor_account',
      description: 'allows to add, remove or Update Vendors',
      title: 'Vendors',
      id: 'vendors',
    },
    {
      icon: 'supervised_user_circle',
      description: 'allows to add, remove or Update Cutomers',
      title: 'Cutomers',
      id: 'cutomers',
    },
    {
      icon: 'add_shopping_cart',
      description: 'allows to add, remove or Update Orders',
      title: 'Order Taking',
      id: 'order-taking',
    },
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

  async signOut() {
    await this.authService.signOut();
  }
}
