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

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { JsonpInterceptor } from '@angular/common/http';
import { Container } from './container';
import { Service } from './service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-apiml',
  templateUrl: './apiml.page.html',
  styleUrls: ['./apiml.page.scss'],
})
export class ApimlPage implements OnInit {

  data: [Container] = null;
  services: Service[] = [];
  loading;

  constructor(private authService: AuthService, private router: Router, private loadingController: LoadingController) { }


  ngOnInit() {

    this.loading = this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 3000
    }).then(loading => loading.present());

    this.authService.getAPIMLData().subscribe(result => {
      console.log('Response', result);

      this.data = result.body as [Container];

      console.log(this.data);

      this.data.forEach(element => {
        console.log(element);
        this.services.push(...element.services)
        // element.services.forEach(servicesElement => {
        //   this.services.push(servicesElement);
        // });
      });
      this.loadingController.dismiss();
    });


  }

  back() {
    this.router.navigate(['inside']);
  }

  logout() {
    this.authService.logout();
  }

}
