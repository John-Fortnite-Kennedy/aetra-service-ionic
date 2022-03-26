import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterboardPage } from './masterboard.page';

const routes: Routes = [
  {
    path: '',
    component: MasterboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterboardPageRoutingModule {}
