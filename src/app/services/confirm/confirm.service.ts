import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  result = '';
  constructor(public dialog: MatDialog) {}
  confirmDialog(
    title = 'Confirm Action',
    message = `Are you sure you want to do this?`,
    maxWidth = '400px',
    minWidth = '330px'
  ): Promise<string> {
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth,
      minWidth,
      data: dialogData,
    });
    return dialogRef.afterClosed().toPromise();
  }
}
