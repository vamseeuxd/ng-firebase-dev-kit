import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTakingRoutingModule } from './order-taking-routing.module';
import { OrderTakingComponent } from './order-taking.component';


@NgModule({
  declarations: [
    OrderTakingComponent
  ],
  imports: [
    CommonModule,
    OrderTakingRoutingModule
  ]
})
export class OrderTakingModule { }
