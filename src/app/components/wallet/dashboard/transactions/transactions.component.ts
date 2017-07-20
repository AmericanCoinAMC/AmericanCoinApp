import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PageEvent} from '@angular/material';
import { WalletService } from '../../../../shared/services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public decryptedWallet: any;
  public pageSizeOptions: number[] = [5,25,75,100];
  public pageSize : number = 25;
  public trxArray: any[];
  private decryptedWallet$$: Subscription;

  constructor(private _walletService: WalletService) { }


  ngOnInit() {
    this.decryptedWallet$$ = this._walletService.decryptedWallet$
      .subscribe(walletObject => {
          this.decryptedWallet = walletObject;
          this.trxArray = walletObject.transactions;
          this.trxArray = (this.trxArray) ? this.trxArray.slice(0,this.pageSize) : [];
      });
  }

  onPageEvent(pageEvent: PageEvent){
    let startIndex = this.pageSize*pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.trxArray = this.decryptedWallet.transactions.slice(startIndex,startIndex+this.pageSize-1);

  } 
}
