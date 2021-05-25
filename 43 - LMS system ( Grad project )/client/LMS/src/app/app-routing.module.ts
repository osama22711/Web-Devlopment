import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './misc/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainmenuComponent,
  },
  {
    path: 'main',
    component: MainmenuComponent,
  },
  {
    path: 'virtual-class',
    component: VirtualClassComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
