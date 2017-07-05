import { Routes } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { WalletComponent } from '../../components/wallet/wallet.component';


// Route Configuration
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    }
];
