import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { WalletService } from '../../../../shared/services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public decryptedWallet: string;
  private decryptedWallet$$: Subscription;
  constructor(private _walletService: WalletService) { }

  ngOnInit() {
    this.decryptedWallet$$ = this._walletService.decryptedWallet$
            .subscribe(walletObject => {
                console.log(walletObject);
                this.decryptedWallet = walletObject;
            });
  }

}
