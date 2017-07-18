import { Component, OnInit } from '@angular/core';
import {appAnimations} from '../../../../shared/animations/app.animations';
import { WalletService } from '../../../../shared/services/wallet.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-balance-details',
    templateUrl: './balance-details.component.html',
    styleUrls: ['./balance-details.component.css'],
    animations: [
        appAnimations.fadeUp('amc'),
        appAnimations.fadeUp('eth'),
    ]
})
export class BalanceDetailsComponent implements OnInit {

    public amc: string;
    public eth: string;
    private decryptedWallet$$: Subscription;
    public decryptedWallet: string;
    constructor(private _walletService: WalletService) {
        this.amc = 'enabled';
        this.eth = 'disabled';
    }

    ngOnInit() {
        this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                console.log(walletObject);
                this.decryptedWallet = walletObject;
            });
    }


    public viewBalanceDetails(symbol: string): void {
        this.refreshView();
        this[symbol] = 'enabled';
    }

    private refreshView(): void {
        this.amc = 'disabled';
        this.eth = 'disabled';
    }
}
