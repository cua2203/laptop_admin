import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBrandComponent } from './list-brand/list-brand.component';
import { BrandRoutingModule } from './brand-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';



@NgModule({
  declarations: [
    ListBrandComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule
  ]
})
export class BrandModule { }
