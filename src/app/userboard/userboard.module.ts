import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserboardPageRoutingModule } from './userboard-routing.module';

import { UserboardPage } from './userboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserboardPageRoutingModule
  ],
  declarations: [UserboardPage]
})
export class UserboardPageModule {}
