import { Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { HomeComponent } from '../../components/home/home.component';
import { WalletComponent } from '../../components/wallet/wallet.component';


// Route Configuration
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            meta: {
                title: 'AmericanCoin - In Decentralization We Trust',
                description: 'This is an All-in-one package'
            }
        }
    },
    {
        path: 'wallet',
        component: WalletComponent,
        data: {
            meta: {
                title: 'Wallet - AmericanCoin',
                description: 'This is an All-in-one package'
            }
        }
    }
];
