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
import { AccountComponent } from './account/account.component';
import { FilterPipe } from './utility/filter.pipe';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MultipleSelectComponent } from './utility/multiple-select/multiple-select.component';
import { EditUserDetailComponent } from './account/edit-user-detail/edit-user-detail.component';
import { CustomInputFileComponent } from './utility/custom-input-file-component/custom-input-file-component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { AdsListItemComponent } from './ads/ads-list-item/ads-list-item.component';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { ChatComponent } from './account/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdsListComponent,
    AdDetailComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ChangePasswordComponent,
    AccountComponent,
    UserProfileComponent,
    EditUserDetailComponent,
    AddAdsComponent,
    MultipleSelectComponent,
    CustomInputFileComponent,
    FilterPipe,
    AdsListItemComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
