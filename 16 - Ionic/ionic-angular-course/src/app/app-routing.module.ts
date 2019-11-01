import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule', canLoad: [AuthGuard] },
  { path: 'bookings', loadChildren: './bookings/bookings.module#BookingsPageModule', canLoad: [AuthGuard] },
  { path: 'aa', loadChildren: './aa/aa.module#AaPageModule' },
  { path: 'test-res', loadChildren: './read-test/test/test-res/test-res.module#TestResPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
