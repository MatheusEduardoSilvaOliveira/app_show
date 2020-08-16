import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhadoCouvertPage } from './detalhado-couvert.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhadoCouvertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhadoCouvertPageRoutingModule {}
