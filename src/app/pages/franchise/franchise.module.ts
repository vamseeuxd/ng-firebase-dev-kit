import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseComponent } from './franchise.component';


@NgModule({
  declarations: [
    FranchiseComponent
  ],
  imports: [
    CommonModule,
    FranchiseRoutingModule
  ]
})
export class FranchiseModule { }
