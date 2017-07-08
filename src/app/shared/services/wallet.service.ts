import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from "rxjs/Observable";
import {BlockCypherService} from './block-cypher.service';

declare var require: any;

const ethereumWalletJs = require('ethereumjs-wallet-browser');
declare const Buffer;

@Injectable()
export class WalletService {
    public initialized: boolean;
    public walletDecrypted: boolean;
    public decryptedWallet: any;

    private __walletState: any;
    public walletState$: Observable<string>;

    constructor(private _blockcyber: BlockCypherService) {
        this.initialized = false;
        this.walletDecrypted = false;
        this.decryptedWallet = {};

        /*
        * Observable
        * */

        this.__walletState = new BehaviorSubject<string>('dashboard');
        this.walletState$ = this.__walletState.asObservable();

    }


    /*
    * Wallet Creation
    * */

    public createWallet(password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject){
            self._blockcyber.generateWallet()
                .then(function (walletRawData){
                    const walletData = JSON.parse(walletRawData._body);
                    resolve({
                        data: walletData,
                        file: WalletService.generateWalletFile(walletData, password)
                    });
                })
                .catch(function (err ){
                    reject(err);
                });
        });
    }



    private static generateWalletFile(walletData: any, password: string): string {
        const privateKeyBuffer = Buffer.from(walletData.private, 'hex');
        const wallet = ethereumWalletJs.fromPrivateKey(privateKeyBuffer);
        const keyStore = wallet.toV3String(password);
        return "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(keyStore));
    }

    public static generateWalletName(): string {
        const todayDate = new Date();
        let dd: any = todayDate.getDate();
        let mm: any = todayDate.getMonth() + 1; //January is 0!

        const yyyy = todayDate.getFullYear();
        if(dd < 10){
            dd = '0' + dd;
        }
        if(mm < 10){
            mm = '0' + mm;
        }
        return 'amc_wallet_' + mm +'-'+ dd + '-' + yyyy + '.json';
    }


    /*
    * Wallet Decryption
    * */

    public decryptWithFile(file: any, password: string): Promise<any> {
        const self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.readWalletFile(file, function(event) {
                    const parsedResult = JSON.parse(event.target.result);
                    const decryptedWallet = ethereumWalletJs.fromV3(parsedResult, password);

                    if(decryptedWallet) {
                        self.decryptedWallet = decryptedWallet;
                        self.walletDecrypted = true;
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
    }

    private readWalletFile(file, onLoadCallback) {
        const reader = new FileReader();
        reader.onload = onLoadCallback;
        reader.readAsText(file);
    }


    public decryptWithPrivateKey(privateKey: string): boolean {
        try {
            const privateKeyBuffer = Buffer.from(privateKey, 'hex');
            const decryptedWallet = ethereumWalletJs.fromPrivateKey(privateKeyBuffer);
            if(decryptedWallet) {
                this.decryptedWallet = decryptedWallet;
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
        this.decryptedWallet = {};
    }
}
