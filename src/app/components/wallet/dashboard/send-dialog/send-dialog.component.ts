import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { WalletService } from '../../../../shared/services/wallet.service';
@Component({
  selector: 'app-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {
  
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
