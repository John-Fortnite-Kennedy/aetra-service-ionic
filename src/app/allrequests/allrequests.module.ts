import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllrequestsPageRoutingModule } from './allrequests-routing.module';

import { AllrequestsPage } from './allrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllrequestsPageRoutingModule
  ],
  declarations: [AllrequestsPage]
})
export class AllrequestsPageModule {}
