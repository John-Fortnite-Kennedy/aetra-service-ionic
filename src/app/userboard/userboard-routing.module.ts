import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserboardPage } from './userboard.page';

const routes: Routes = [
  {
    path: '',
    component: UserboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserboardPageRoutingModule {}
