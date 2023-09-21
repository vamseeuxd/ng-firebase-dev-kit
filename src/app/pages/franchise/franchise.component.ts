import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import {
  FirestoreService,
  ICollotionManager,
  ITimestamp,
} from 'src/app/services/firestore/firestore.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';
import { AddressService } from 'src/app/services/address/address.service';

export interface IFranchise {
  city: string;
  createdOn?: ITimestamp;
  createdBy?: string;
  name: string;
  owner: string;
  state: string;
  addressLine2: string;
  country: string;
  mobile: string;
  email: string;
  addressLine1: string;
  id?: string;
}

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss'],
})
export class FranchiseComponent {
  firestoreManager: FirestoreService = inject(FirestoreService);
  @ViewChild('dialogRef') dialogTemplateRef: TemplateRef<any> | undefined;
  franchisesManager: ICollotionManager<IFranchise>;
  dialogRef: MatDialogRef<unknown> | undefined;
  readonly newFranchise: IFranchise = {
    city: '',
    name: '',
    owner: '',
    state: '',
    addressLine2: '',
    country: '',
    id: '',
    addressLine1: '',
    mobile: '',
    email: '',
  };

  constructor(
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private confirmService: ConfirmService,
    public addressService: AddressService,
    private _snackBar: MatSnackBar
  ) {
    // prettier-ignore
    this.franchisesManager = this.firestoreManager.getCollotionManager<IFranchise>('franchises');
  }

  openDialog(franchise: IFranchise, isEdit: boolean): void {
    if (this.dialogTemplateRef) {
      this.dialogRef = this.dialog.open(this.dialogTemplateRef, {
        data: { franchise, isEdit, id: franchise.id },
      });
    }
  }

  onNoClick(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  async saveData(franchiseForm: NgForm, isEdit: boolean, id: string) {
    const loaderId = this.loaderService.show();
    if (isEdit) {
      await this.franchisesManager.update(id, franchiseForm.value);
      this._snackBar.open('Franchise Updated successfully', 'OK');
    } else {
      await this.franchisesManager.add(franchiseForm.value);
      this._snackBar.open('New Franchise Created successfully', 'OK');
    }
    franchiseForm.resetForm({});
    this.loaderService.hide(loaderId);
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  async deleteData(franchise: IFranchise) {
    if (franchise.id) {
      const isConfirmed = await this.confirmService.confirm(
        'Delete Confirmation',
        'Are you sure! Do you want to delete Franchise?'
      );
      if (isConfirmed) {
        const loaderId = this.loaderService.show();
        await this.franchisesManager.remove(franchise.id);
        this.loaderService.hide(loaderId);
        this._snackBar.open('Franchise deleted successfully', 'OK');
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      }
    }
  }
}
