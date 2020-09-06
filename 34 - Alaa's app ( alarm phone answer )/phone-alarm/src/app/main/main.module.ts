import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AudioManagement } from '@ionic-native/audio-management/ngx';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MainPageRoutingModule],
  declarations: [MainPage],
  providers: [AndroidPermissions, CallNumber, AudioManagement],
})
export class MainPageModule {}
