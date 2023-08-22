import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
  {
    path: 'franchise',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/franchise/franchise.module').then(m => m.FranchiseModule),
  },
  {
    path: 'brachces',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/brachces/brachces.module').then(m => m.BrachcesModule),
  },
  {
    path: 'products',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'prices',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/prices/prices.module').then(m => m.PricesModule),
  },
  {
    path: 'inventory',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/inventory/inventory.module').then(m => m.InventoryModule),
  },
  {
    path: 'sales',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/sales/sales.module').then(m => m.SalesModule),
  },
  {
    path: 'vendors',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/vendors/vendors.module').then(m => m.VendorsModule),
  },
  {
    path: 'cutomers',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/cutomers/cutomers.module').then(m => m.CutomersModule),
  },
  {
    path: 'order-taking',
    canActivate: [AuthService],
    loadChildren: () =>
      import('./pages/order-taking/order-taking.module').then(
        m => m.OrderTakingModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        m => m.RegistrationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
