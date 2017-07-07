import { Component, OnInit, Inject } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import {MdSnackBar} from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    public walletFile: any;
    public walletFileSelected: boolean;
    public password: string;
    public passwordVisible: boolean;
    public privateKey: string;
    constructor(private _walletService: WalletService,
                private _snackbar: MdSnackBar,
                @Inject(DOCUMENT) private document: any) {
        this.walletFileSelected = false;
        this.passwordVisible = false;
    }

    ngOnInit() {


    }

    public goto(state: string): void {
        this._walletService.changeState(state);
    }

    public toggleVisibility(): void {
        if(this.passwordVisible) {
            this.document.getElementById('passwordFieldAuthenticate').type = 'password';
        } else {
            this.document.getElementById('passwordFieldAuthenticate').type = 'text';
        }
        this.passwordVisible = !this.passwordVisible;
    }

    public decryptWithFile(): void {
        const self = this;
        self._walletService.decryptWithFile(this.walletFile, this.password)
            .then(function(response) {
                if(response) {
                    self._snackbar.open(
                        'Wallet Decrypted Successfully.',
                        '', {duration: 3000});
                }else {
                    self._snackbar.open(
                        'Incorrect Wallet File or Password.',
                        '', {duration: 3000});
                }
            })
            .catch(function(err){
                console.log(err);
            });
    }

    public decryptWithPrivateKey(): void {
        this.privateKey = this.privateKey.replace(/\s+/g, '');
        if(this._walletService.decryptWithPrivateKey(this.privateKey)) {
            this._snackbar.open(
                'Wallet Decrypted Successfully.',
                '', {duration: 3000});
        }else {
            this._snackbar.open(
                'Incorrect Private Key.',
                '', {duration: 3000});
        }
    }

    public walletFileChanged(e: any): void {
        const file = e.srcElement.files[0];
        if(file !== undefined &&
            file !== null){
            this.walletFileSelected = true;
            this.walletFile = file;
        }else {
            this.walletFileSelected = false;
        }
    }
}
