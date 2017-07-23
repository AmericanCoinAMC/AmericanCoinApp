import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { WalletService } from '../../../../shared/services/wallet.service';
import { MdSnackBar, MdDialog } from '@angular/material';

@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {
  
  public decryptedWallet: string;
  private decryptedWallet$$: Subscription;
  constructor(private _walletService: WalletService,
              private _dialog: MdDialog,
              private _snackbar: MdSnackBar) { }

  ngOnInit() {
    this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                this.decryptedWallet = walletObject;
            });
  }


    showMessage(message: string): void {
        this._snackbar.open(message, '', {duration: 4000});
    }

    public close(): void {
        this._dialog.closeAll();
    }
}
