import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeconfirmationPage } from './codeconfirmation.page';

const routes: Routes = [
  {
    path: '',
    component: CodeconfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeconfirmationPageRoutingModule {}
