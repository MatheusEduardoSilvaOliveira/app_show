import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoCriarPageRoutingModule } from './foto-criar-routing.module';

import { FotoCriarPage } from './foto-criar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoCriarPageRoutingModule
  ],
  declarations: [FotoCriarPage]
})
export class FotoCriarPageModule {}
