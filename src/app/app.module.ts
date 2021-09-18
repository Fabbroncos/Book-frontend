import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './account/account.component';
import { FilterPipe } from './utility/filter.pipe';
import { AddBookComponent } from './book/add-book/add-book.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { MultipleSelectComponent } from './utility/multiple-select/multiple-select.component';
import { EditUserDetailComponent } from './account/edit-user-detail/edit-user-detail.component';
import { CustomInputFileComponent } from './utility/custom-input-file-component/custom-input-file-component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { BookListItemComponent } from './book/book-list-item/book-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BookListComponent,
    BookDetailComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ChangePasswordComponent,
    AccountComponent,
    UserProfileComponent,
    EditUserDetailComponent,
    AddBookComponent,
    MultipleSelectComponent,
    CustomInputFileComponent,
    FilterPipe,
    BookListItemComponent
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
