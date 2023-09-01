import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../../shared/confirm-dialog/confirm-dialog.component';
import { AlertButtons } from '.';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  result = '';
  constructor(public dialog: MatDialog) {}
  confirm(
    title = 'Confirm Action',
    message = `Are you sure you want to do this?`,
    buttons: AlertButtons = [
      { text: 'OK', role: 'primary' },
      { text: 'Cancel', dismiss: true, role: 'link' },
    ],
    _props: MatDialogConfig = {
      maxWidth: '400px',
      minWidth: '330px',
      disableClose: false,
    }
  ): Promise<string> {
    const dialogData = new ConfirmDialogModel(title, message, buttons);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      ..._props,
      data: dialogData,
    });
    return lastValueFrom(dialogRef.afterClosed());
  }
}
