import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhadoCouvertPageRoutingModule } from './detalhado-couvert-routing.module';

import { DetalhadoCouvertPage } from './detalhado-couvert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhadoCouvertPageRoutingModule
  ],
  declarations: [DetalhadoCouvertPage]
})
export class DetalhadoCouvertPageModule {}
