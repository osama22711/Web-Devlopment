import { NotFoundComponent } from './misc/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import {
  NbButtonModule,
  NbCardModule,
  NbSpinnerModule,
  NbDialogModule,
  DEFAULT_THEME,
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VirtualClassComponent } from './virtual-class/virtual-class.component';

const declarations = [AppComponent, VirtualClassComponent, NotFoundComponent];

const imports = [
  BrowserModule,
  AngularFireModule.initializeApp(environment.firebaseConfig),
  NbButtonModule,
  NbCardModule,
  FormsModule,
  ReactiveFormsModule,
  NbSpinnerModule,
  NbDialogModule.forRoot(),
  NbLayoutModule,
  NbSidebarModule,
  AppRoutingModule,
];
@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [
    ...NbThemeModule.forRoot(
      {
        name: 'default',
      },
      [DEFAULT_THEME]
    ).providers,
    NbSidebarModule.forRoot().providers,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
