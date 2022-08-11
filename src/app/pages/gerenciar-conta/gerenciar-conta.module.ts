import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerenciarContaPageRoutingModule } from './gerenciar-conta-routing.module';

import { GerenciarContaPage } from './gerenciar-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerenciarContaPageRoutingModule
  ],
  declarations: [GerenciarContaPage]
})
export class GerenciarContaPageModule {}
