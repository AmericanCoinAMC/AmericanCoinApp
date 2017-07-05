import { Component, Inject, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import { DOCUMENT } from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    public password: string;
    public walletCreated: boolean;
    public creatingWallet: boolean;
    public walletFileDownloaded: boolean;
    public passwordVisible: boolean;
    public walletData: any;
    public walletFile: string;

    constructor(private _walletService: WalletService,
                @Inject(DOCUMENT) private document: any,
                private _snackbar: MdSnackBar) {
        this.passwordVisible = false;
        this.walletCreated = false;
        this.walletFileDownloaded = false;
    }

    ngOnInit() {
    }



    public create(password: string): void {
        const self = this;
        self.creatingWallet = true;
        self._snackbar.open(
            'Your wallet is being created. This process may take a few minutes.',
            '', {duration: 3000});
        self._walletService.createWallet(self.password)
            .then(function(walletObject){
                self.walletData = walletObject.data;
                self.walletFile = walletObject.file;
                self.walletCreated = true;
                self.creatingWallet = false;
                self._snackbar.open(
                    'Wallet: ' + self.walletData.address + ' has been created.',
                    '', {duration: 4000});
            }).catch(function(err){
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
    }


    public toggleVisibility(): void {
        if(this.passwordVisible) {
            this.document.getElementById('password-field').type = 'password';
        } else {
            this.document.getElementById('password-field').type = 'text';
        }
        this.passwordVisible = !this.passwordVisible;
    }




    /*
    * Paper Wallet
    * */

    public printPaperWallet(): void {
        window.print();
    }

    public getDate(): any {
        return new Date();
    }

    public getBrowser(): string {
        return navigator.appName;
    }

    public getPlatform(): string {
        return navigator.platform;
    }
}
