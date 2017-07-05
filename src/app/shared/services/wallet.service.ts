import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var require: any;

const ethereumWalletJs = require('ethereumjs-wallet-browser');
declare const Buffer;

@Injectable()
export class WalletService {
    public initialized: boolean;
    public walletDecrypted: boolean;
    private baseUrl: string;
    private blockCypherKey: string;
    private headerOptions: any;

    constructor(private _http: Http) {
        this.initialized = false;
        this.walletDecrypted = false;
        this.baseUrl = 'https://api.blockcypher.com/v1/eth/main/';
        this.blockCypherKey = 'cce584fb11234db981082469dbe8670e';

        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });

    }

    public createWallet(password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){
            self.generateWallet()
                .then(function (walletRawData){
                    const walletData = JSON.parse(walletRawData._body);
                    resolve(WalletService.generateWalletFile(walletData, password));
                })
                .catch(function (err ){
                    reject(err);
                });
        });
    }

    private generateWallet(): Promise<any> {
        return this._http.post(
            this.baseUrl + 'addrs',
            this.blockCypherKey,
            this.headerOptions)
            .toPromise();
    }

    private static generateWalletFile(walletData: any, password: string): string {
        const privateKeyBuffer = Buffer.from(walletData.private, 'hex');
        const wallet = ethereumWalletJs.fromPrivateKey(privateKeyBuffer);
        const keyStore = wallet.toV3String(password);
        return "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(keyStore));
    }


}
