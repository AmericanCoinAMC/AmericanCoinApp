import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-paper-wallet',
    templateUrl: './paper-wallet.component.html',
    styleUrls: ['./paper-wallet.component.css']
})
export class PaperWalletComponent implements OnInit {

    @Input()
    walletData: any;

    platform: string;
    constructor() {
        this.platform = navigator.platform;
    }

    ngOnInit() {
        if (this.walletData === undefined) {
            this.walletData = {};
        }
    }



    public printPaperWallet(): void {
        window.print();
    }

}
