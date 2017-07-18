import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';
import { WalletService } from '../../../../shared/services/wallet.service';

@Component({
    selector: 'app-receive-dialog',
    templateUrl: './receive-dialog.component.html',
    styleUrls: ['./receive-dialog.component.css']
})
export class ReceiveDialogComponent implements OnInit {

    constructor(private _dialog: MdDialog,
                private _snackbar: MdSnackBar,
                public _walletService: WalletService) { }

    ngOnInit() {
    }

    showMessage(message: string): void {
        console.log(this._walletService.decryptedWallet);
        this._snackbar.open(message, '', {duration: 4000});
    }

    public close(): void {
        this._dialog.closeAll();
    }
}
