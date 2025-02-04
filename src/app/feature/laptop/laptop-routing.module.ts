import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListLaptopComponent} from "./list-laptop/list-laptop.component";
import {EditLaptopComponent} from "./edit-laptop/edit-laptop.component";
import {AddLaptopComponent} from "./add-laptop/add-laptop.component";


const routes: Routes = [
  { path: '', component: ListLaptopComponent },
  { path: 'edit/:id', component: EditLaptopComponent },
  { path: 'add', component: AddLaptopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaptopRoutingModule {}
