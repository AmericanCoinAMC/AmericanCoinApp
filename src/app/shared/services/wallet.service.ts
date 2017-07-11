import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


declare var require: any;

const ethereumWalletJs = require('ethereumjs-wallet-browser');
declare const Buffer;

@Injectable()
export class WalletService {
    public initialized: boolean;

    public walletDecrypted: boolean;
    public walletInstance: any;
    public decryptedWallet: any;

    private __walletState: any;
    public walletState$: Observable<string>;


    public baseUrl: string;
    private headerOptions: any;

    constructor(private _http: Http) {
        this.initialized = false;

        this.walletDecrypted = false;
        this.walletInstance = {};
        this.decryptedWallet = {};

        /*
        * Observable
        * */

        this.__walletState = new BehaviorSubject<string>('authentication');
        this.walletState$ = this.__walletState.asObservable();


        /*
        * Functions
        * */

        this.baseUrl =
            'https://quiet-shore-48971.herokuapp.com/api';

        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });
    }


    /*
    * Wallet Creation
    * */

    /*public createWallet(password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){
            self._blockcypher.generateWallet()
                .then(function (walletRawData){
     const walletData = JSON.parse(walletRawData._body);
                    resolve({
                        data: {
                            privateKey: walletData.private,
                            publicKey: walletData.public,
                            address: walletData.address,
                        },
                        file: WalletService.generateWalletFile(walletData, password)
                    });
                })
                .catch(function (err ){
                    reject(err);
                });
        });
    }*/

    /*public createWallet(password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){
            self._http.post(
                self.baseUrl + '/create?password=' + password,
                {},
                self.headerOptions)
                .toPromise()
                .then(function (response){
                    //console.log(response._body);
                    if(response.ok){
                        //const walletData = JSON.parse(rawData._body);

                        const responseData = response;
                         console.log(responseData);
                    }else{
                        reject(false);
                    }

                })
                .catch(function(err) {reject(err)});
        });
    }*/




    public createWallet(password: string): Observable<any> {
        return this._http.post(
            this.baseUrl + '/create?password=' + password,
            {},
            this.headerOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    }


    /*
     * Observables Handling
     * */

    private handleResponse(res: Response) {
        if(res.text() == 'false'){
            return false;
        }else {
            return JSON.parse(res.text());
        }

    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    /*
    * Wallet Decryption
    * */

    /*public decryptWithFile(file: any, password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.readWalletFile(file, function(event) {
                    const parsedResult = JSON.parse(event.target.result);
                    const walletInstance = ethereumWalletJs.fromV3(parsedResult, password);

                    if(walletInstance) {
                        self.walletInstance = walletInstance;
                        self.walletDecrypted = true;
                        self.decryptedWallet = {
                            privateKey: walletInstance.getPrivateKey(),
                            publicKey:  walletInstance.getPublicKey(),
                            address:  walletInstance.getAddress(),
                        };
                        resolve(true);
                    }else {
                        self.setWalletDefaults();
                        resolve(false);
                    }
                });
            }
            catch (e) {
                console.log(e);
                this.setWalletDefaults();
                resolve(false);
            }
        });
    }*/

    public decryptWithFile(file: any, password: string): Observable<any> {
        const self = this;
        self.readWalletFile(file, function (e) {
            const file = JSON.parse(e.target.result);
            return self._http.post(
                self.baseUrl + '/decryptWithFile?password=' + password,
                {},
                self.headerOptions)
                .map(this.handleResponse)
                .catch(this.handleError);
        });
    }


    private readWalletFile(file, onLoadCallback) {
        const reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsText(file);
    }




    public decryptWithPrivateKey(privateKey: string): boolean {
        try {
            const privateKeyBuffer = Buffer.from(privateKey, 'hex');
            const walletInstance = ethereumWalletJs.fromPrivateKey(privateKeyBuffer);
            if(walletInstance) {
                this.walletInstance = walletInstance;
                this.walletDecrypted = true;
                return true;
            }else {
                this.setWalletDefaults();
                return false;
            }
        }
        catch (e) {
            console.log(e);
            this.setWalletDefaults();
            return false;
        }
    }



    /*
    * Wallet State Observable Emitter
    * */

    public changeState(state: string): void {
        this.stateHandler(state);
    }

    private stateHandler(state): void {
        switch(state) {
            case 'authentication':
                this.setWalletDefaults();
                this.__walletState.next(state);
                break;
            case 'walletCreation':
                this.setWalletDefaults();
                this.__walletState.next(state);
                break;
            case 'faq':
                this.setWalletDefaults();
                this.__walletState.next(state);
                break;
            case 'dashboard':
                this.walletDecrypted = true;
                this.__walletState.next(state);
                break;
            default:
                this.setWalletDefaults();
                this.__walletState.next('authentication');
                break;
        }
    }


    /*
    * Defaults
    * */

    private setWalletDefaults(): void {
        this.walletDecrypted = false;
        this.walletInstance = {};
        this.decryptedWallet = {};
    }
}
