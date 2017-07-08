import { Component, OnInit } from '@angular/core';
import {appAnimations} from '../../../../shared/animations/app.animations';

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
    constructor() {
        this.amc = 'enabled';
        this.eth = 'disabled';
    }

    ngOnInit() {
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
