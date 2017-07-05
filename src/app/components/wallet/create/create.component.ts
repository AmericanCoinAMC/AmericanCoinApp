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
        self._walletService.createWallet(self.password)
            .then(function(walletFile){
                self.walletFile = walletFile;
                self.walletCreated = true;
                self.creatingWallet = false;
                /*self._snackbar.open('Your wallet has been created successfully', '', {
                    duration: 2000,
                });*/
            }).catch(function(err){
            console.log(err);
        });
    }


    public downloadFile(): void {
        this.walletFileDownloaded = true;
        window.open(this.walletFile);
    }


    public toggleVisibility(): void {
        if(this.passwordVisible) {
            this.document.getElementById('password-field').type = 'password';
        } else {
            this.document.getElementById('password-field').type = 'text';
        }
        this.passwordVisible = !this.passwordVisible;
    }

}
