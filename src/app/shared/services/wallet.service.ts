import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


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
     * Observables Handling
     * */

    private handleResponse(res: Response) {
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


    /*
    * Wallet State Observable Emitter
    * */

    public changeState(state: string): void {
        this.stateHandler(state);
    }

    private stateHandler(state): void {
        switch (state) {
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
