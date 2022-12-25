import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { AdDetailComponent } from './ad-detail/ad-detail.component'
import { AddAdsFormComponent } from './add-ads/add-ads-form/add-ads-form.component'
import { AddAdsComponent } from './add-ads/add-ads.component'
import { AddAdItemFormComponent } from './add-ads/app-add-ad-item-form/app-add-ad-item-form.component'
import { AdsListItemComponent } from './ads-list-item/ads-list-item.component'
import { AdsListComponent } from './ads-list/ads-list.component'
import { AdsViewerComponent } from './ads-viewer.component'

@NgModule({
  declarations: [
    AdsViewerComponent,
    AdDetailComponent,
    AddAdsComponent,
    AddAdsFormComponent,
    AdsListComponent,
    AdsListItemComponent,
    AddAdItemFormComponent,
  ],
  imports: [SharedModule],
  exports: [AddAdsComponent, AddAdsFormComponent, AdsListComponent, AdsListItemComponent],
})
export class AdsModule {}
