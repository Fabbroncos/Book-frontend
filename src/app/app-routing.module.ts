import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component'
import { AdDetailComponent } from './ads/ad-detail/ad-detail.component'
import { ChangePasswordComponent } from './auth/change-password/change-password.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { AccountComponent } from './account/account.component'
import { GenreResolverService } from './ads/genre-resolver.service'
import { EditUserDetailComponent } from './account/edit-user-detail/edit-user-detail.component'
import { AuthGuard } from './auth/auth.guard'
import { ProvincesResolverService } from './auth/provinces-resolver.service'
import { UserProfileComponent } from './account/user-profile/user-profile.component'
import { AddAdsComponent } from './ads/add-ads/add-ads.component'
import { AdsListComponent } from './ads/ads-list/ads-list.component'
import { ChatComponent } from './account/chat/chat.component'
import { OwnerAdsComponent } from './account/owner-ads/owner-ads.component'
import { AdsViewerComponent } from './ads/ads-viewer.component'
import { ChatResolverService } from './account/chat/chat-resolver.service'
import { UserResolverService } from './account/user-resolver.service'
import { CityResolverService } from './auth/city-resolver.service copy'
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component'
import { PublicUserDetail } from './account/public-user-detail/public-user-detail.component'
import { PrivacyComponent } from './privacy/privacy.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:user_id', component: PublicUserDetail },
  { path: 'privacy', component: PrivacyComponent },
  {
    path: 'home',
    resolve: [GenreResolverService],
    children: [
      { path: '', component: AdsViewerComponent },
      { path: ':book-userId/:book-id', component: AdDetailComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent, resolve: [ProvincesResolverService] },
      { path: 'confirm-account/:token', component: ConfirmAccountComponent },
      { path: 'password-recovery', component: PasswordRecoveryComponent },
    ],
  },
  {
    path: ':username',
    component: AccountComponent,
    canActivate: [AuthGuard],
    // resolve:[UserResolverService],
    children: [
      { path: '', component: UserProfileComponent },
      { path: 'my-profile', component: UserProfileComponent },
      {
        path: 'my-profile/edit',
        component: EditUserDetailComponent,
        resolve: [ProvincesResolverService, CityResolverService],
      },
      { path: 'my-insertion', component: OwnerAdsComponent },
      { path: 'add-book', component: AddAdsComponent, resolve: [GenreResolverService] },
      { path: 'chat', component: ChatComponent, resolve: [ChatResolverService] },
      { path: 'change-password', component: ChangePasswordComponent },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
