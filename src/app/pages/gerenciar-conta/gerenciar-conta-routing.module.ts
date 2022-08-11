import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerenciarContaPage } from './gerenciar-conta.page';

const routes: Routes = [
  {
    path: '',
    component: GerenciarContaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerenciarContaPageRoutingModule {}
