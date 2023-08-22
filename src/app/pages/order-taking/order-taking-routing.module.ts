import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTakingComponent } from './order-taking.component';

const routes: Routes = [{ path: '', component: OrderTakingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTakingRoutingModule { }
