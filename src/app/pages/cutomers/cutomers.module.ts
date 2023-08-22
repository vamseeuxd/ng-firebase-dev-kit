import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutomersRoutingModule } from './cutomers-routing.module';
import { CutomersComponent } from './cutomers.component';


@NgModule({
  declarations: [
    CutomersComponent
  ],
  imports: [
    CommonModule,
    CutomersRoutingModule
  ]
})
export class CutomersModule { }
