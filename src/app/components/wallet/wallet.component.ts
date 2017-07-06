import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../shared/services/wallet.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
    public walletState: string;
    private walletState$$: Subscription;

    constructor(private _walletService: WalletService) {

    }

    ngOnInit() {
        this.walletState$$ = this._walletService.walletState$
            .subscribe(state => this.walletStateSubscriptionEvent(state))
    }


    private walletStateSubscriptionEvent(state: string): void {
        this.walletState = state;
    }

    public openUrl (location: string): void {
        window.open(location, '_blank');
    }
}
