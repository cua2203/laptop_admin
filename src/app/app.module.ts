import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './feature/home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import {LaptopModule} from "./feature/laptop/laptop.module";
import {AuthInterceptor} from "./core/auth.interceptor";
import {NgChartsModule} from "ng2-charts";
import {SharedModule} from "./shared/shared/shared.module";




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LaptopModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgChartsModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
        timeOut: 3000,
        extendedTimeOut: 2000,
      }
    ),


  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
