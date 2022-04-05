import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'gate',
    loadChildren: () => import('./gate/gate.module').then( m => m.GatePageModule)
  },
  {
    path: 'adminboard',
    loadChildren: () => import('./adminboard/adminboard.module').then( m => m.AdminboardPageModule)
  },
  {
    path: 'masterboard',
    loadChildren: () => import('./masterboard/masterboard.module').then( m => m.MasterboardPageModule)
  },
  {
    path: 'userboard',
    loadChildren: () => import('./userboard/userboard.module').then( m => m.UserboardPageModule)
  },
  {
    path: 'allrequests',
    loadChildren: () => import('./allrequests/allrequests.module').then( m => m.AllrequestsPageModule)
  },
  {
    path: 'finishedrequests',
    loadChildren: () => import('./finishedrequests/finishedrequests.module').then( m => m.FinishedrequestsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'codeconfirmation',
    loadChildren: () => import('./codeconfirmation/codeconfirmation.module').then( m => m.CodeconfirmationPageModule)
  },
  {
    path: 'newrequest/:id',
    loadChildren: () => import('./create-request/create-request.module').then( m => m.CreateRequestPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
