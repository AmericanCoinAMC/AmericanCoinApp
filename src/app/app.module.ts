
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


/*
* Languages
* */


/*
 * Routing
 * */
import { routes } from './shared/routes/app.routes';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

/*
* Environment Variables
* */
import { environment } from '../environments/environment';


/*
* Pipes
* */
import { CapitalizePipe } from './shared/pipes/capitalize/capitalize.pipe';


/*
* Services
* */
import { WalletService } from './shared/services/wallet.service';


/*
* Components
* */

// Root Component
import { AppComponent } from './app.component';

// Home Component
import { HomeComponent } from './components/home/home.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CreateComponent } from './components/wallet/create/create.component';









@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        WalletComponent,
        CreateComponent,
        CapitalizePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot(),
        RouterModule.forRoot(routes),
    ],
    providers: [ WalletService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
