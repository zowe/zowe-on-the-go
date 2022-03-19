/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'inside', loadChildren: import('./pages/inside/inside.module').then(m => m.InsidePageModule) },
  { path: 'zosmf', loadChildren: import('./pages/zosmf/zosmf.module').then(m => m.ZosmfPageModule) },
  { path: 'jobs', loadChildren: import('./pages/jobs/jobs.module').then(m => m.JobsPageModule) },
  { path: 'apiml', loadChildren: import('./pages/apiml/apiml.module').then(m => m.ApimlPageModule) },
  { path: 'files', loadChildren: import('./pages/files/files.module').then(m => m.FilesPageModule) },
  { path: 'console', loadChildren: import('./pages/console/console.module').then(m => m.ConsolePageModule) },
  { path: 'uss', loadChildren: import('./pages/uss/uss.module').then(m => m.UssPageModule) },
  { path: 'cancel/:name/:id', loadChildren: import('./pages/jobs/cancel/cancel.module').then(m => m.CancelPageModule) },
  { path: 'delete/:name/:id', loadChildren: import('./pages/jobs/delete/delete.module').then(m => m.DeletePageModule) },
  { path: 'menu/:data', loadChildren: import('./pages/jobs/menu/menu.module').then(m => m.MenuPageModule) },
  { path: 'result/:data', loadChildren: import('./pages/jobs/result/result.module').then(m => m.ResultPageModule) },
  { path: 'restart/:name/:id', loadChildren: import('./pages/jobs/restart/restart.module').then(m => m.RestartPageModule) },
  { path: 'view/:name/:id', loadChildren: import('./pages/jobs/view/view.module').then(m => m.ViewPageModule) },
  { path: 'detail/:name/:jid/:step/:dd/:id', loadChildren: import('./pages/jobs/detail/detail.module').then(m => m.DetailPageModule) },
  { path: 'edit/:name/:id', loadChildren: import('./pages/jobs/edit/edit.module').then(m => m.EditPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }