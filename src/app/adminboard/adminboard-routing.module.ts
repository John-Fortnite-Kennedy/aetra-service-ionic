import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllrequestsPage } from '../allrequests/allrequests.page';
import { ChartPage } from '../chart/chart.page';
import { FinishedrequestsPage } from '../finishedrequests/finishedrequests.page';
import { ReportPage } from '../report/report.page';

import { AdminboardPage } from './adminboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminboardPage
  },
  {
    path: 'charts',
    component: ChartPage
  },
  {
    path: 'allrequests',
    component: AllrequestsPage
  },
  {
    path: 'finishedrequests',
    component: FinishedrequestsPage
  },
  {
    path: 'report',
    component: ReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminboardPageRoutingModule {}
