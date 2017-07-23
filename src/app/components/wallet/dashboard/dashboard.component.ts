import { Component, Inject,  OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import {MdSnackBar, MdDialog, MdDialogRef} from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import {SendDialogComponent} from './send-dialog/send-dialog.component';
import {ReceiveDialogComponent} from './receive-dialog/receive-dialog.component';
import { FaqComponent } from '../../../shared/components/faq/faq.component';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    public decryptedWallet: string;
    private decryptedWallet$$: Subscription;
    constructor(public _walletService: WalletService,
                private _snackbar: MdSnackBar,
                @Inject(DOCUMENT) private document: any,
                private _dialog: MdDialog) {

    }

    ngOnInit() {
        this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                this.decryptedWallet = walletObject;
            });
    }


    public sendFunds(): void {
        const dialogRef = this._dialog.open(SendDialogComponent);
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public receiveFunds(): void {
        const dialogRef = this._dialog.open(ReceiveDialogComponent);
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public showFaqDialog(): void {
        const dialogRef = this._dialog.open(FaqComponent);
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    showMessage(message: string): void {
        this._snackbar.open(message, '', {duration: 4000});
    }
}
