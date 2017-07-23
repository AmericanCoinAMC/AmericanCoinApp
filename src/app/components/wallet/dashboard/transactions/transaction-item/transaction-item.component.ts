import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WalletService } from '../../../../../shared/services/wallet.service';

@Component({
    selector: 'app-transaction-item',
    templateUrl: './transaction-item.component.html',
    styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {

    @Input()
    transaction: any;

    @Input()
    activeFilter: string;

    constructor(private _walletService: WalletService) { }

    ngOnInit() {
    }

    public openUrl (location: string): void {
        window.open(location, '_blank');
    }

    public goto(state: string): void {
        this._walletService.changeState(state);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.transaction){
            this.transaction = changes.transaction.currentValue;
        }
        if(changes.activeFilter){
            this.activeFilter = changes.activeFilter.currentValue;
        }
    }

}
