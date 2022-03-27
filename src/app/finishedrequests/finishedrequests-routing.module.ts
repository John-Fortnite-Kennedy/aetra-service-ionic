import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishedrequestsPage } from './finishedrequests.page';

const routes: Routes = [
  {
    path: '',
    component: FinishedrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishedrequestsPageRoutingModule {}
