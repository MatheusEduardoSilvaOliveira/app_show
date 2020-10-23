import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouvertPageRoutingModule } from './couvert-routing.module';

import { CouvertPage } from './couvert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouvertPageRoutingModule
  ],
  declarations: [CouvertPage]
})
export class CouvertPageModule {}
