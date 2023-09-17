import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AlertButton, AlertButtons } from '../../services/confirm';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  buttons: AlertButtons;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.buttons = data.buttons;
  }

  onConfirm(config: AlertButton): void {
    if (config && config.handler) {
      config.handler(config);
    }
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(config: AlertButton): void {
    if (config && config.handler) {
      config.handler(config);
    }
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public buttons: AlertButtons = []
  ) {}
}
