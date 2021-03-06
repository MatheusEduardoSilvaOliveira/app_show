import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      {
        path: 'couvert',
        loadChildren: () => import('../couvert/couvert.module').then( m => m.CouvertPageModule)
      },
      {
        path: 'show',
        loadChildren: () => import('../show/show.module').then( m => m.ShowPageModule)
      },
      {
        path: 'favorito',
        loadChildren: () => import('../favorito/favorito.module').then( m => m.FavoritoPageModule)
      },
      {
        path: 'foto',
        loadChildren: () => import('../foto/foto.module').then( m => m.FotoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/couvert',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/couvert',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}