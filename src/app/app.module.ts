
/*
* Angular
* */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

/*
* Angular Material & Front-End Tools
* */
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

/*
* Dynamic Meta Tags
* */
import { MetaModule } from '@ngx-meta/core';


/*
* Languages
* */
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService } from './shared/languages/index';


/*
 * Routing
 * */
import { routes } from './shared/routes/app.routes';



/*
* AngularFire + AtomicBase2 + Back-End Tools
* */
import { AngularFireModule } from 'angularfire2';



/*
* Environment Variables
* */
import { environment } from '../environments/environment';


/*
* Components
* */

// Root Component
import { AppComponent } from './app.component';

// Home Component
import { HomeComponent } from './components/home/home.component';


declare var require: any;

// Web3js Ethereum
const Web3 = require('web3');
const keythereum = require('keythereum');
const ethereumWallet = require('ethereumjs-wallet');


const web3 = new Web3(new Web3.providers.HttpProvider('https://api.myetherapi.com/eth'));


if (web3.isConnected()) {
    console.log('Connected');
}

console.log(web3.eth);



/*let balance = web3.eth.getBalance('0xea674fdde714fd979de3edf0f56aa9716b898ec8');
console.log(balance.toNumber());*/



/*const wallet = keythereum.create({ keyBytes: 32, ivBytes: 16 });
console.log(wallet);*/

//console.log(ethereumWallet.generate());


@NgModule({
    declarations: [
        TranslatePipe,
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot(),
        MetaModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
    ],
    providers: [ TRANSLATION_PROVIDERS, TranslateService],
    bootstrap: [AppComponent]
})
export class AppModule { }
