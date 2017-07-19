import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk';
import {Subscription} from 'rxjs/Subscription';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { WalletService } from '../../../../shared/services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public decryptedWallet: string;
  private decryptedWallet$$: Subscription;
  public exampleDatabase: ExampleDatabase
  public dataSource: ExampleDataSource | null;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private _walletService: WalletService) { }


  ngOnInit() {
    this.decryptedWallet$$ = this._walletService.decryptedWallet$
      .subscribe(walletObject => {
          console.log(walletObject);
          this.decryptedWallet = walletObject;
          this.exampleDatabase = new ExampleDatabase(this.decryptedWallet);
          this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);
      });
  }

}

//Taken from Angular material

export interface TransactionData{
  txHash: string;
  amount: number;
  from: string;
  to: string
}

export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<TransactionData[]> = new BehaviorSubject<TransactionData[]>([]);
  get data(): TransactionData[] { return this.dataChange.value; }

  constructor(backendData: any) { //IMPORTANT: CHANGE THIS TO THE FORMATED TRANSACTION API.
    for (let obj in backendData) { this.addTrx(obj,backendData[obj]); }
  }

  /** Adds a new transaction to the database. */
  addTrx(key: string, value: any) {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewTransaction(key, value));
    this.dataChange.next(copiedData);
  }

  /* Builds and returns a new Transaction. 
   * This has nothing to do with Ethereum transactions. Just a representation object
   * 
  */
  private createNewTransaction(key: string, val: any) {
    
    return {
      txHash: key,
      amount: val.amount,
      from: val.from,
      to: val.to
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TransactionData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this._exampleDatabase.data.slice();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}
