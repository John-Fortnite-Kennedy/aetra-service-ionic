import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartPage } from '../chart/chart.page';

import { AdminboardPage } from './adminboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminboardPage
  },
  {
    path: 'charts',
    component: ChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminboardPageRoutingModule {}
