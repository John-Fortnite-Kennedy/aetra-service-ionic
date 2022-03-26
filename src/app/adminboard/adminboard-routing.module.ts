import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminboardPage } from './adminboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminboardPageRoutingModule {}
