import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllrequestsPage } from './allrequests.page';

const routes: Routes = [
  {
    path: '',
    component: AllrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllrequestsPageRoutingModule {}
