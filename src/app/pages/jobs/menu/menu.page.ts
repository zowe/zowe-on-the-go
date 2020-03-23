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
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobsPage} from "../jobs.page";
import {environment} from "../../../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  jobID: string;
  jobname: string;
  strWithInfo: string;
  data: any;
  constructor(private authService: AuthService, private router: Router, private jobsPage: JobsPage,
              public activeRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.strWithInfo = this.activeRoute.snapshot.paramMap.get('data');
    const arr = this.strWithInfo.split(',');
    this.jobname = arr[0];
    this.jobID = arr[1];
    console.log('items:', this.jobID, this.jobname);
    this.authService.getJobInfo(this.jobname, this.jobID).subscribe(result => {
      this.data = { ...result.body };
      console.log('data', this.data);
  });
  }
  spool() {
    this.router.navigate(['view', this.jobname, this.jobID]);
  }
  restart() {
    this.router.navigate(['restart', this.jobname, this.jobID]);
  }
  edit() {
    this.router.navigate(['edit', this.jobname, this.jobID]);
  }
  delete() {
    this.router.navigate(['delete', this.jobname, this.jobID]);
  }
  cancel() {
    this.router.navigate(['cancel', this.jobname, this.jobID]);
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 50);
    this.authService.getJobInfo(this.jobname, this.jobID).subscribe(result => {

      console.log('Did refresh, LOL! s', result);
      this.data = { ...result.body };
      console.log(this.data);
  });
  }
  back() {
    this.router.navigate(['jobs']);
  }
}
