import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseComponent } from './franchise.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@NgModule({
  declarations: [FranchiseComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FranchiseRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
})
export class FranchiseModule {}
