import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../shared/services/wallet.service';


@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


    constructor(private _walletService: WalletService) { }

    ngOnInit() {


    }




    generateAddress(password: string): void {

    }
}
