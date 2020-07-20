import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhadoPage } from './detalhado.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhadoPageRoutingModule {}
