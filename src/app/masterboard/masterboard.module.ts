import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterboardPageRoutingModule } from './masterboard-routing.module';

import { MasterboardPage } from './masterboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterboardPageRoutingModule
  ],
  declarations: [MasterboardPage]
})
export class MasterboardPageModule {}
