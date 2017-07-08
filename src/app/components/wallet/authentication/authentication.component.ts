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
    public decryptingWallet: boolean;
    public walletDecrypted: any;

    constructor(private _walletService: WalletService,
                private _snackbar: MdSnackBar,
                @Inject(DOCUMENT) private document: any) {
        this.walletFileSelected = false;
        this.passwordVisible = false;
        this.decryptingWallet = false;
        this.walletDecrypted = {};
    }

    ngOnInit() {


    }

    public goto(state: string): void {
        this.decryptingWallet = false;
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
        self.decryptingWallet = true;
        self._snackbar.open(
            'Decrypting Wallet. This process may take a few minutes',
            '', {duration: 3000});

        self._walletService.decryptWithFile(this.walletFile, this.password)
            .then(function(response) {
                self.decryptingWallet = false;
                if(response) {
                    self.password = '';
                    self._snackbar.open(
                        'Wallet Decrypted Successfully.',
                        '', {duration: 3000});

                    self.goto('dashboard');
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
        this.decryptingWallet = true;
        if(this._walletService.decryptWithPrivateKey(this.privateKey)) {
            this.decryptingWallet = false;
            this.privateKey = '';
            this._snackbar.open(
                'Wallet Decrypted Successfully.',
                '', {duration: 3000});
            this.goto('dashboard');
        }else {
            this.decryptingWallet = false;
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
