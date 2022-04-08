import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AccountModule } from './account/account.module';
import { SharedModule } from './shared/shared.module';
import { AdsModule } from './ads/ads.module';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { PublicUserDetail } from './account/public-user-detail/public-user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PublicUserDetail,
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
