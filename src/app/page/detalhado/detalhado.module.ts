import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhadoPageRoutingModule } from './detalhado-routing.module';

import { DetalhadoPage } from './detalhado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhadoPageRoutingModule
  ],
  declarations: [DetalhadoPage]
})
export class DetalhadoPageModule {}
