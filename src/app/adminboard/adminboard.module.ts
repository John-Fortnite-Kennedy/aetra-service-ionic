import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminboardPageRoutingModule } from './adminboard-routing.module';

import { AdminboardPage } from './adminboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminboardPageRoutingModule
  ],
  declarations: [AdminboardPage]
})
export class AdminboardPageModule {}
