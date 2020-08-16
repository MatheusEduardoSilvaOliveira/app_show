import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhadoEventoPage } from './detalhado-evento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhadoEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhadoEventoPageRoutingModule {}
