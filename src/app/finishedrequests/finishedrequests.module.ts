import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishedrequestsPageRoutingModule } from './finishedrequests-routing.module';

import { FinishedrequestsPage } from './finishedrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishedrequestsPageRoutingModule
  ],
  declarations: [FinishedrequestsPage]
})
export class FinishedrequestsPageModule {}
