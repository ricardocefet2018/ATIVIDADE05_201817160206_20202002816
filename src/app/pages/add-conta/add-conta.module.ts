import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddContaPageRoutingModule } from './add-conta-routing.module';

import { AddContaPage } from './add-conta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddContaPageRoutingModule
  ],
  declarations: [AddContaPage]
})
export class AddContaPageModule {}
