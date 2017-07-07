import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../shared/services/wallet.service';
import {appAnimations} from '../../shared/animations/app.animations';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    animations: [
        appAnimations.fadeUp('creation'),
        appAnimations.fadeUp('authentication'),
        appAnimations.fadeUp('dashboard'),
        appAnimations.fadeUp('faq')
    ]
})
export class WalletComponent implements OnInit {
    public walletState: string;
    private walletState$$: Subscription;
    public creation: string;
    public authentication: string;
    public dashboard: string;
    public faq: string;

    constructor(private _walletService: WalletService) {
    }

    ngOnInit() {
        this.walletState$$ = this._walletService.walletState$
            .subscribe(state => this.walletStateSubscriptionEvent(state));
    }


    private walletStateSubscriptionEvent(state: string): void {
        this.walletState = state;
        this.refreshView();
        this[state] = 'enabled';
    }

    public openUrl (location: string): void {
        window.open(location, '_blank');
    }

    public goto(state: string): void {
        this._walletService.changeState(state);
    }

    private refreshView(): void {
        this.creation = 'disabled';
        this.authentication = 'disabled';
        this.dashboard = 'disabled';
        this.faq = 'disabled';
    }
}
