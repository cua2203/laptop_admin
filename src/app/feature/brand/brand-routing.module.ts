import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandComponent } from './list-brand/list-brand.component';



const routes: Routes = [
  { path: '', component: ListBrandComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
