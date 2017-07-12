import { Component, Inject,  OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import {MdSnackBar, MdDialog, MdDialogRef} from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import {SendDialogComponent} from './send-dialog/send-dialog.component';
import {ReceiveDialogComponent} from './receive-dialog/receive-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public _walletService: WalletService,
              private _snackbar: MdSnackBar,
              @Inject(DOCUMENT) private document: any,
              private _dialog: MdDialog) {

  }

  ngOnInit() {
  }


  public sendFunds(): void {
      let dialogRef = this._dialog.open(SendDialogComponent, {width: '800px'});
      dialogRef.afterClosed().subscribe(result => {

      });
  }

    public receiveFunds(): void {
        let dialogRef = this._dialog.open(ReceiveDialogComponent, {width: '500px'});
        dialogRef.afterClosed().subscribe(result => {

        });
    }


  showMessage(message: string): void {
      this._snackbar.open(message, '', {duration: 4000});
  }
}
