import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarTipoPage } from './gerenciar-tipo.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarTipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarTipoPageRoutingModule {}
