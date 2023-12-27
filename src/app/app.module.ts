import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './core/not-found/not-found.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AppRequestInterceptor} from "./interceptors/app.request.interceptor";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from "./module/auth/auth.module";
import {HomeModule} from "./module/home/home.module";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [AppComponent, NotFoundComponent, HeaderComponent, FooterComponent,

  ],
  imports: [BrowserModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    AppRoutingModule, AuthModule,HomeModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AppRequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
