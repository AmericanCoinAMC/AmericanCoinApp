import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { WalletService } from '../../../../shared/services/wallet.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
    public filters: any[];
    public activeFilter: string;

    public decryptedWallet: any;
    private decryptedWallet$$: Subscription;

    public testTransactions: any[];

    constructor(private _walletService: WalletService) {
        this.filters = ['all', 'sent', 'received'];
        this.activeFilter = 'all';


        /*
        * Testing Purposes
        * use this.decryptedWallet.transactions instead
        * */

        this.testTransactions = [
            {
                $key: '0x01938f473f406a4cccb3dde1e05ec1a79c350dc28a308a924461176ce3a9e017',
                type: 'received',
                from: '0x2EE3bC98d63d46a03f670Aaac42f7Dd2A6dc8970',
                to: '0x2c7FC229f9DF5527cAB721bA7D01B0EbBE819CbC',
                amount: 18245.52548545, // @TODO Number pipe - only show 2 decimals / On hover tooltip full amount
                description: 'Received some AMC.',
                txTS: 1500747083556,
                blockNumber: 18588,
                fee: 0.001,
                status: true,
                $priority: -1500747083556
            },
            {
                $key: '0xc97d608d13742f8b05b9837e06dda90a419f4fbcd518f5e39c40eabdea6f8520',
                type: 'sent',
                from: '0x2c7FC229f9DF5527cAB721bA7D01B0EbBE819CbC',
                to: '0x2EE3bC98d63d46a03f670Aaac42f7Dd2A6dc8970',
                amount: 18511368.99,
                description: 'Sending some AMC back',
                txTS: 1500747094687,
                blockNumber: -1,
                fee: 0,
                status: false,
                $priority: -1500747094687
            }
        ];
    }


    ngOnInit(): void {
        this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                this.decryptedWallet = walletObject;
            });
        this.updateData();
        
    }

    private updateData(): void {
        let fun = () => {
            this._walletService.getRefreshData(this.decryptedWallet.address)
                .subscribe((addressData) => {
                    this.decryptedWallet.tansactions = addressData.transactions;
                    this.decryptedWallet.balance = addressData.balance;
                    this.decryptedWallet.ethBalance = addressData.ethBalance;
                    this.decryptedWallet.generalData = addressData.generalData;
                }
            );
            this.updateData();
        }
        setTimeout(fun,35000);
    }

    public activateFilter(filter: string): void {
        this.activeFilter = filter;
    }
}
