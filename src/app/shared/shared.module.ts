import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AdsListComponent } from "../ads/ads-list/ads-list.component";
import { CustomInputFileComponent } from "./custom-input-file-component/custom-input-file-component";
import { FilterPipe } from "./filter.pipe";
import { MultipleSelectComponent } from "./multiple-select/multiple-select.component";

@NgModule({
  declarations: [
    CustomInputFileComponent,
    MultipleSelectComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomInputFileComponent,
    MultipleSelectComponent,
    FilterPipe
  ]
})
export class SharedModule {}