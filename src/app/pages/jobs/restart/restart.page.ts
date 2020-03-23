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
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restart',
  templateUrl: './restart.page.html',
  styleUrls: ['./restart.page.scss'],
})
export class RestartPage implements OnInit {

  username = environment.user;
  password = environment.pass;
  data = null;
  jobname = null;
  jobid = null;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.jobname = this.activeRoute.snapshot.paramMap.get('name');
    this.jobid = this.activeRoute.snapshot.paramMap.get('id');
    console.log('restart p:', this.jobname, this.jobid);
    this.authService.restartJob(this.jobname, this.jobid).subscribe(result => {
      this.data = result;
    });
  }

  restart() {
    this.authService.submitJob(this.jobname, this.jobid, this.data).subscribe(result => {
      console.log('subinit: ', result);
    });
    this.authService.showInfo(`Job ${this.jobname}(${this.jobid}) restarted`);
    // it's not waiting for the response
    const dtldata = this.jobname + ',' + this.jobid;
    console.log('restart', dtldata);
    this.router.navigate(['menu', dtldata]);
  }

  back() {
    this.router.navigate(['jobs']);
  }
}
