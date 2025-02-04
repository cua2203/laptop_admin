import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category/list-category.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
  ]
})
export class CategoryModule { }
