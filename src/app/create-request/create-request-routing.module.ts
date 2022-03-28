import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreateRequestPage } from './create-request.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class CreateRequestPageRoutingModule {}
