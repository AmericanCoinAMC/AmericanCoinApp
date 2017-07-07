import { Component, Inject, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import { DOCUMENT } from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';
import {appAnimations} from '../../../shared/animations/app.animations';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    animations: [
        appAnimations.fadeUp('creation'),
        appAnimations.fadeUp('download'),
        appAnimations.fadeUp('print')
    ]
})
export class CreateComponent implements OnInit {
    public password: string;
    public walletCreated: boolean;
    public creatingWallet: boolean;
    public walletFileDownloaded: boolean;
    public passwordVisible: boolean;
    public walletData: any;
    public walletFile: string;

    public creation: string;
    public download: string;
    public print: string;

    constructor(private _walletService: WalletService,
                @Inject(DOCUMENT) private document: any,
                private _snackbar: MdSnackBar) {
        this.passwordVisible = false;
        this.walletCreated = false;
        this.walletFileDownloaded = false;


    }

    ngOnInit() {
        this.creation = 'enabled'
    }



    public create(password: string): void {
        const self = this;
        self.creatingWallet = true;
        self._snackbar.open(
            'Your wallet is being created. This process may take a few minutes.',
            '', {duration: 3700});
        self._walletService.createWallet(self.password)
            .then(function(walletObject){
                self.walletData = walletObject.data;
                self.walletFile = walletObject.file;
                self.walletCreated = true;
                self.creatingWallet = false;
                self._snackbar.open(
                    'Wallet: ' + self.walletData.address + ' has been created.',
                    '', {duration: 4500});
                self.refreshView();
                self.download = 'enabled';
            }).catch(function(err){
            self._snackbar.open(
                'There has been an error creating your wallet. Please try again later.',
                '', {duration: 3700});
                self.creatingWallet = false;
                console.log(err);
            });
    }


    public downloadFile(): void {
        const dlAnchorElem = this.document.getElementById('downloadWalletAnchor');
        dlAnchorElem.setAttribute("href", this.walletFile);
        dlAnchorElem.setAttribute("download", WalletService.generateWalletName());
        dlAnchorElem.click();
        this.walletFileDownloaded = true;
        this._snackbar.open(
            'Wallet File has been downloaded.',
            '', {duration: 2500});

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
        this.creation = 'disabled';
        this.download = 'disabled';
        this.print = 'disabled';
    }

}
