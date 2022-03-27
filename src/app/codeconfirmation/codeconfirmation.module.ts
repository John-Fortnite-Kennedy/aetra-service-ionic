import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodeconfirmationPageRoutingModule } from './codeconfirmation-routing.module';

import { CodeconfirmationPage } from './codeconfirmation.page';

import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodeconfirmationPageRoutingModule,
    CodeInputModule
  ],
  declarations: [CodeconfirmationPage]
})
export class CodeconfirmationPageModule {}
