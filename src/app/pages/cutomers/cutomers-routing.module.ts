import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutomersComponent } from './cutomers.component';

const routes: Routes = [{ path: '', component: CutomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutomersRoutingModule { }
