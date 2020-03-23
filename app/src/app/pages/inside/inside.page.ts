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

import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

 
@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  username = null;
  password = null;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.username = environment.user;
    this.password = environment.pass;
    console.log('inside', environment.user, this.username);
  }

  jobs() {
    this.router.navigate(['jobs']);
  }

  apiml() {
    this.router.navigate(['apiml']);
  }

  view() {
    this.router.navigate(['view']);
  }

  files() {
    this.router.navigate(['files']);
  }

  logout() {
    this.authService.logout();
  }

}