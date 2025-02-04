import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },

      // Add more routes here
    ],
  },
  {
    path: 'laptop',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./feature/laptop/laptop.module').then((m) => m.LaptopModule),
  },
  {
    path: 'brand',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () =>import('./feature/brand/brand.module').then((m) => m.BrandModule),
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    loadChildren: () =>import('./feature/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
