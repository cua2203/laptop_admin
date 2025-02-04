import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListLaptopComponent} from "./list-laptop/list-laptop.component";
import {SharedModule} from "../../shared/shared/shared.module";
import {LaptopRoutingModule} from "./laptop-routing.module";
import { AddLaptopComponent } from './add-laptop/add-laptop.component';
import { EditLaptopComponent } from './edit-laptop/edit-laptop.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListLaptopComponent,
    AddLaptopComponent,
    EditLaptopComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaptopRoutingModule,
    ReactiveFormsModule,

  ]
})
export class LaptopModule { }
