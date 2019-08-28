import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { FormsModule }           from '@angular/forms';
import { HttpModule }            from '@angular/http';

import { RestfulAPI }            from './modules/Utils/restfulAPI';
import { CookieService }         from './modules/Base/Cookie/cookie.service';

import { AppComponent }          from './app.component';
import { PageNotFoundComponent } from './modules/Base/PageNotFound/PageNotFound.component';
import { MenuComponent }         from './modules/Base/Menu/Menu.component';
import { MyHeaderComponent }     from './modules/Base/MyHeader/MyHeader.component';
import { MyFooterComponent }     from './modules/Base/MyFooter/MyFooter.component';
import { AboutComponent }        from './modules/About/About.component';

import { AppRoutingModule }      from './app-routing.module';
import { AuthModule }            from './modules/Auth/Auth.module';
import { AdminModule }           from './modules/Admin/Admin.module';

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
    HttpModule,
  	AuthModule,
    AdminModule,
    AppRoutingModule
  ],
  declarations: [ 
  	AppComponent,
    MenuComponent,
  	MyHeaderComponent,
    MyFooterComponent,
  	PageNotFoundComponent,
    AboutComponent
  ],
  providers: [ 
    CookieService,
    RestfulAPI
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
