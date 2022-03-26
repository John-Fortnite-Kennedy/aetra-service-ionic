import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GatePageRoutingModule } from './gate-routing.module';

import { GatePage } from './gate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GatePageRoutingModule
  ],
  declarations: [GatePage]
})
export class GatePageModule {}
