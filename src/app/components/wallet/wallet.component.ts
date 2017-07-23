import { Component, OnInit, ViewChild } from '@angular/core';
import { WalletService } from '../../shared/services/wallet.service';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import {appAnimations} from '../../shared/animations/app.animations';
import {Subscription} from 'rxjs/Subscription';
import {MdSidenav, MdDialog} from '@angular/material';


@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    animations: [
        appAnimations.fadeUp('walletCreation'),
        appAnimations.fadeUp('authentication'),
        appAnimations.fadeUp('dashboard')
    ]
})
export class WalletComponent implements OnInit {
    public walletState: string;
    private walletState$$: Subscription;
    public walletCreation: string;
    public authentication: string;
    public dashboard: string;

    @ViewChild('sidenav') private _sidenav: MdSidenav;

    constructor(private _walletService: WalletService,
                private _dialog: MdDialog) {
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
        this._sidenav.close();
    }

    public goto(state: string): void {
        this._walletService.changeState(state);
        this._sidenav.close();
    }

    private refreshView(): void {
        this.walletCreation = 'disabled';
        this.authentication = 'disabled';
        this.dashboard = 'disabled';
    }

    public printPaperWallet(): void {
        window.print();
    }


    public showFaqDialog(): void {
        const dialogRef = this._dialog.open(FaqComponent);
        dialogRef.afterClosed().subscribe(result => {
            this._sidenav.close();
        });
    }
}
