import { Component, Inject, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import { DOCUMENT } from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';
import {appAnimations} from '../../../shared/animations/app.animations';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    animations: [
        appAnimations.fadeUp('walletCreation'),
        appAnimations.fadeUp('download'),
        appAnimations.fadeUp('print')
    ]
})
export class CreateComponent implements OnInit {
    public password: string;
    public walletCreated: boolean;
    public creatingWallet: boolean;
    public createdWallet: any;
    public walletFileDownloaded: boolean;
    public passwordVisible: boolean;

    // States
    public walletCreation: string;
    public download: string;
    public print: string;

    constructor(public _walletService: WalletService,
                @Inject(DOCUMENT) private document: any,
                private _snackbar: MdSnackBar) {
        this.passwordVisible = false;
        this.walletCreated = false;
        this.createdWallet = {};
        this.walletFileDownloaded = false;
    }

    ngOnInit() {
        this.walletCreation = 'enabled'
    }


    public create(): void {
        this.creatingWallet = true;
        this._snackbar.open(
            'Your wallet is being created. This process may take a few minutes.',
            '', {duration: 3700});

        this._walletService.createWallet(this.password)
            .subscribe( walletObject => {
                    this.creatingWallet = false;
                    this.walletCreated = true;
                    this.createdWallet = walletObject;
                    this.refreshView();
                    this.download = 'enabled';
                    this._snackbar.open(
                        'Wallet: ' + this.createdWallet.addressString +
                        ' has been created.',
                        '', {duration: 4500});
                },
                error => {
                    this.creatingWallet = false;
                    this._snackbar.open(
                        'There has been an error creating your wallet. Please try again later.',
                        '', {duration: 3700});
                });
    }


    public downloadFile(): void {
        const dlAnchorElem = this.document.getElementById('downloadWalletAnchor');
        dlAnchorElem.setAttribute("href", this.createdWallet.walletFile);
        dlAnchorElem.setAttribute("download", this.createdWallet.walletFileName);
        dlAnchorElem.click();
        this._snackbar.open(
            'Wallet File has been downloaded.',
            '', {duration: 2500});
        this.walletFileDownloaded = true;
        this.refreshView();
        this.print = 'enabled';
    }


    public toggleVisibility(): void {
        if(this.passwordVisible) {
            this.document.getElementById('passwordFieldCreate').type = 'password';
        } else {
            this.document.getElementById('passwordFieldCreate').type = 'text';
        }
        this.passwordVisible = !this.passwordVisible;
    }


    public goto(state: string): void {
        this._walletService.changeState(state);
    }

    private refreshView(): void {
        this.walletCreation = 'disabled';
        this.download = 'disabled';
        this.print = 'disabled';
    }

}
