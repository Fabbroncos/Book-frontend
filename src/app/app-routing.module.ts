import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './account/account.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { GenreResolverService } from './book/genre-resolver.service';
import { EditUserDetailComponent } from './account/edit-user-detail/edit-user-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProvincesResolverService } from './auth/provinces-resolver.service';
import { UserProfileComponent } from './account/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {
    path: 'insertion',
    children: [
      {path: '', component: BookListComponent},
      // {path: 'newest', component: BookListComponent},
      {path: ':book-userId/:book-id', component: BookDetailComponent}
    ]
  },
  {
    path: 'auth',
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component:LoginComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'confirm-account/:token', component:ConfirmAccountComponent},
    ]
  },
  {
    path: ':username', component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '',component: UserProfileComponent},
      {path: 'my-profile',component: UserProfileComponent},
      {path: 'my-profile/edit',component: EditUserDetailComponent, resolve: [ProvincesResolverService]},
      {path: 'my-insertion',component: BookListComponent},
      // {path: 'my-orders',component: BookListComponent},
      {path: 'add-book',component: AddBookComponent, resolve: [GenreResolverService]},
      {path: 'change-password', component:ChangePasswordComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
