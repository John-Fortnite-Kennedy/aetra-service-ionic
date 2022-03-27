import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeconfirmationPageRoutingModule } from './codeconfirmation-routing.module';

import { CodeconfirmationPage } from './codeconfirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeconfirmationPageRoutingModule
  ],
  declarations: [CodeconfirmationPage]
})
export class CodeconfirmationPageModule {}
