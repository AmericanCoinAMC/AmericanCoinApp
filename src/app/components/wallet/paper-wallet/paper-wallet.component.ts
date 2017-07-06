import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-paper-wallet',
    templateUrl: './paper-wallet.component.html',
    styleUrls: ['./paper-wallet.component.css']
})
export class PaperWalletComponent implements OnInit {

    @Input()
    walletData: any;

    browser: string;
    platform: string;
    constructor() {
        this.platform = navigator.platform;
    }

    ngOnInit() {

    }



    public printPaperWallet(): void {
        window.print();
    }

}
