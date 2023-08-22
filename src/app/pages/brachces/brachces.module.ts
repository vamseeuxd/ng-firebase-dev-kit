import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrachcesRoutingModule } from './brachces-routing.module';
import { BrachcesComponent } from './brachces.component';


@NgModule({
  declarations: [
    BrachcesComponent
  ],
  imports: [
    CommonModule,
    BrachcesRoutingModule
  ]
})
export class BrachcesModule { }
