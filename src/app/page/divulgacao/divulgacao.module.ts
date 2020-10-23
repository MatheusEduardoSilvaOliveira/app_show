import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivulgacaoPageRoutingModule } from './divulgacao-routing.module';

import { DivulgacaoPage } from './divulgacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivulgacaoPageRoutingModule
  ],
  declarations: [DivulgacaoPage]
})
export class DivulgacaoPageModule {}
