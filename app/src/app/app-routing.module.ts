import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './modules/Base/PageNotFound/PageNotFound.component';
import { AboutComponent } from './modules/About/About.component';

const appRoutes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
