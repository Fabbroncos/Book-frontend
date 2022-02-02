import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AddAdsFormComponent } from './ads/add-ads/add-ads-form/add-ads-form.component';
import { AdsViewerComponent } from './ads/ads-viewer.component';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { AdsModule } from './ads/ads.module';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    PasswordRecoveryComponent,
    ChangePasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    AccountModule,
    AdsModule,
    SharedModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
