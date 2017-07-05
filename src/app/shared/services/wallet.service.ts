import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WalletService {
    public initialized: boolean;
    public walletDecrypted: boolean;
    private baseUrl: string;
    private blockCypherKey: string;
    private headerOptions: any;

    constructor(private _http: Http) {
        this.initialized = false;
        this.baseUrl = 'https://api.blockcypher.com/v1/eth/main/';
        this.blockCypherKey = 'cce584fb11234db981082469dbe8670e';

        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });

    }

    public createWallet(password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){

        });
    }

    public generateWallet(): Promise<any> {
        return this._http.post(
            this.baseUrl + 'addrs',
            this.blockCypherKey,
            this.headerOptions)
            .toPromise();
    }


}
