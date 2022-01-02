import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AccountComponent } from './account/account.component';
import { GenreResolverService } from './ads/genre-resolver.service';
import { EditUserDetailComponent } from './account/edit-user-detail/edit-user-detail.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProvincesResolverService } from './auth/provinces-resolver.service';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { AddAdsComponent } from './ads/add-ads/add-ads.component';
import { AdsListComponent } from './ads/ads-list/ads-list.component';
import { ChatComponent } from './account/chat/chat.component';
import { OwnerAdsComponent } from './account/owner-ads/owner-ads.component';
import { AdsViewerComponent } from './ads/ads-viewer.component';
import { ChatResolverService } from './account/chat/chat-resolver.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {
    path: 'insertion', //resolve: [GenreResolverService],
    children: [
      {path: '', component: AdsViewerComponent},
      // {path: 'newest', component: BookListComponent},
      {path: ':book-userId/:book-id', component: AdDetailComponent}
    ]
  },
  {
    path: 'auth',
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component:LoginComponent},
      {path: 'register', component:RegisterComponent , resolve:[ProvincesResolverService]},
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
      {path: 'my-insertion',component: OwnerAdsComponent},
      // {path: 'my-orders',component: BookListComponent},
      {path: 'add-book',component: AddAdsComponent, resolve: [GenreResolverService]},
      {path: 'chat', component: ChatComponent, resolve: [ChatResolverService]},
      {path: 'change-password', component:ChangePasswordComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
