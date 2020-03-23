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
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  jobname: any;
  jobid: any;
  dd: any;
  stepname: any;
  id: any;
  data: any;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.jobname = this.activeRoute.snapshot.paramMap.get('name');
    this.jobid = this.activeRoute.snapshot.paramMap.get('jid');
    this.dd = this.activeRoute.snapshot.paramMap.get('ddname');
    this.stepname = this.activeRoute.snapshot.paramMap.get('stepname');
    this.id = this.activeRoute.snapshot.paramMap.get('id');

    this.viewJobDetail(this.jobname, this.jobid, this.id).subscribe(result => {
      console.log('I am in Detail');
      this.data = result;
    });
  }

  viewJobDetail(jobname, jobid, id){
    // console.log('${environment.zosURL}/api/v1/zosmf/restjobs/jobs/',jobname,jobid,id,'records');
    return this.http.get(`${environment.zosURL}/api/v1/zosmf/restjobs/jobs/${jobname}/${jobid}/files/${id}/records`, {
      headers: {
        'X-CSRF-ZOSMF-HEADER': '',
        'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
      },
      responseType: 'text'
    })
      .pipe(
        catchError(e => {
        console.log('err', e);
        let status = e.status;
        if (status === 401) {
          this.authService.showAlert('You are not authorized for this!');
          throw new Error(e);
        }
        throw new Error(e);
        })
      );
  }

  back() {
    this.router.navigate(['view', this.jobname, this.jobid]);
  }
}
