import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouvertPage } from './couvert.page';

const routes: Routes = [
  {
    path: '',
    component: CouvertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouvertPageRoutingModule {}
