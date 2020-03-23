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

import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsPage } from '../jobs.page';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
@Injectable()
export class ResultPage implements OnInit {

  result = null;
  constructor(private authService: AuthService, private router: Router, private jobsPage: JobsPage, public activeRoute: ActivatedRoute) { }
  items: Array<any> = null;
  data = null;
  dtldata = null;

  ngOnInit() {
    const newresponse = this.activeRoute.snapshot.paramMap.get('data');
    this.data = JSON.parse(newresponse);
    this.items = this.data.body;
    console.log('items:', this.items);
  }

  back() {
    this.router.navigate(['jobs']);
  }

  menu(jobname, jobid) {
    console.log('menu:', jobname, jobid);
    this.dtldata = jobname + ',' + jobid;
    this.router.navigate(['menu', this.dtldata]);
  }

}
