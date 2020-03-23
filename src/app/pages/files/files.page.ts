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

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage implements OnInit {

  data = null;
  responseArray: Array<any> = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getFilesData().subscribe(result => {
      console.log('I am in files!', result);
      const x = JSON.stringify(result);
      this.data = JSON.parse(x);
      console.log(typeof(this.data));
      this.responseArray = this.data.items;
    });
  }

  back() {
    this.router.navigate(['inside']);
  }

  logout() {
    this.authService.logout();
  }

}