import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class WalletService {
    public initialized: boolean;

    private __walletState: any;
    public walletState$: Observable<string>;

    private __decryptedWallet: any;
    public decryptedWallet$: Observable<string>;


    public baseUrl: string;
    private headerOptions: any;

    constructor(private _http: Http) {
        this.initialized = false;

        /*
        * Observables
        * */

        this.__walletState = new BehaviorSubject<string>('authentication');
        this.walletState$ = this.__walletState.asObservable();

        this.__decryptedWallet = new BehaviorSubject<any>({});
        this.decryptedWallet$ = this.__decryptedWallet.asObservable();

        /*
        * API
        * */

        // this.baseUrl = 'https://amcapi.herokuapp.com/api';
        this.baseUrl = 'http://localhost:8080/api';

        const headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });
    }


    /*
    * Wallet Creation
    * */

    public createWallet(password: string): Observable<any> {
        return this._http.post(
            this.baseUrl + '/create?password=' + password,
            {},
            this.headerOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    }



    /*
    * Wallet Decryption
    * */

    public decryptWithFile(file: any, password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject) {
            self.readWalletFile(file, function(event) {
                resolve(self._http.post(
                    self.baseUrl + '/decryptWithFile?password=' + password + '&file=' + event.target.result,
                    {},
                    self.headerOptions)
                    .map(self.handleResponse)
                    .catch(self.handleError));
            });
        });

    }


    private readWalletFile(file, onLoadCallback) {
        const reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsText(file);
    }


    /*
     * Decrypt with Private Key
     * */

    public decryptWithPrivateKey(privateKey: string): Observable<any> {
        return this._http.post(
            this.baseUrl + '/decryptWithPrivateKey?privateKey=' + privateKey,
            {},
            this.headerOptions)
            .map(this.handleResponse)
            .catch(this.handleError);
    }



    /*
     * Wallet Decrypted Observable Emitter
     * */

    public walletDecryptSuccess(walletObject): void {
        console.log();
        this.__decryptedWallet.next(walletObject);
    }

    public walletEncrypt(): void {
        this.__decryptedWallet.next({});
    }


    /*
    * Wallet State Observable Emitter
    * */

    public changeState(state: string): void {
        this.stateHandler(state);
    }

    private stateHandler(state): void {
        switch (state) {
            case 'authentication':
                this.walletEncrypt();
                this.__walletState.next(state);
                break;
            case 'walletCreation':
                this.walletEncrypt();
                this.__walletState.next(state);
                break;
            case 'faq':
                this.walletEncrypt();
                this.__walletState.next(state);
                break;
            case 'dashboard':
                this.__walletState.next(state);
                break;
            default:
                this.walletEncrypt();
                this.__walletState.next('authentication');
                break;
        }
    }


    /*
     * Observables Handling
     * */

    private handleResponse(res: Response) {
        console.log(res.text());
        if (res.text() === 'false') {
            return false;
        }else {
            return JSON.parse(res.text());
        }

    }
    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

}
