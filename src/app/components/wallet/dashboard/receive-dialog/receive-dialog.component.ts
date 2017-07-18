import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { WalletService } from '../../../../shared/services/wallet.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'app-receive-dialog',
    templateUrl: './receive-dialog.component.html',
    styleUrls: ['./receive-dialog.component.css']
})
export class ReceiveDialogComponent implements OnInit {
    public decryptedWallet: string;
    private decryptedWallet$$: Subscription;
    constructor(private _dialog: MdDialog,
                private _snackbar: MdSnackBar,
                public _walletService: WalletService) { }

    ngOnInit() {
        this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                console.log(walletObject);
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
