import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class BlockCypherService {
    public baseUrl: string;
    private key: string;
    private headerOptions: any;

    constructor(private _http: Http) {
        this.baseUrl = 'https://api.blockcypher.com/v1/eth/main';
        this.key = 'cce584fb11234db981082469dbe8670e';

        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });
    }


    public generateWallet(): Promise<any> {
        return this._http.post(
            this.baseUrl + '/addrs',
            this.key,
            this.headerOptions)
            .toPromise();
    }


    public getBalance(address: string): Promise <any> {
        return this._http.post(
            this.baseUrl + '/addrs/' + address + '/balance',
            this.key,
            this.headerOptions)
            .toPromise();
    }

}
