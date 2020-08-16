import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalhadoEventoPageRoutingModule } from './detalhado-evento-routing.module';

import { DetalhadoEventoPage } from './detalhado-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhadoEventoPageRoutingModule
  ],
  declarations: [DetalhadoEventoPage]
})
export class DetalhadoEventoPageModule {}
