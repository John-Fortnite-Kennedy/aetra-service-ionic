import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GatePage } from './gate.page';

const routes: Routes = [
  {
    path: '',
    component: GatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatePageRoutingModule {}
