import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AdsModule } from '../ads/ads.module'
import { SharedModule } from '../shared/shared.module'
import { AccountComponent } from './account.component'
import { ChatComponent } from './chat/chat.component'
import { EditUserDetailComponent } from './edit-user-detail/edit-user-detail.component'
import { OwnerAdsComponent } from './owner-ads/owner-ads.component'
import { UserProfileComponent } from './user-profile/user-profile.component'

@NgModule({
  declarations: [AccountComponent, ChatComponent, EditUserDetailComponent, OwnerAdsComponent, UserProfileComponent],
  imports: [SharedModule, AdsModule],
  exports: [AccountComponent],
})
export class AccountModule {}
