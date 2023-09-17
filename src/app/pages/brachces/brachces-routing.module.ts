import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrachcesComponent } from './brachces.component';

const routes: Routes = [{ path: '', component: BrachcesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrachcesRoutingModule { }
