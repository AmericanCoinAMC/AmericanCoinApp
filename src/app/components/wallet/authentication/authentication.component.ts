import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../shared/services/wallet.service';
import {MdSnackBar} from '@angular/material';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
    public walletFile: any;
    public walletFileSelected: boolean;
    public password: string;
    public privateKey: string;
    constructor(private _walletService: WalletService,
                private _snackbar: MdSnackBar) {
        this.walletFileSelected = false;
    }

    ngOnInit() {
    }

    public goto(state: string): void {
        this._walletService.changeState(state);
    }

    public decryptWithFile(): void {
        this._walletService.decryptWithFile(this.walletFile, this.password);
    }

    public decryptWithPrivateKey(): void {
        this._walletService.decryptWithPrivateKey(this.privateKey);
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
        console.log(file);
    }
}
