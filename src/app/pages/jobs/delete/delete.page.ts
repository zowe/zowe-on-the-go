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
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
})
export class DeletePage implements OnInit {

  url = environment.url;
  jobname = null;
  jobid = null;
  loading;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, public activeRoute: ActivatedRoute,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.jobname = this.activeRoute.snapshot.paramMap.get('name');
    this.jobid = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.jobname, this.jobid);
  }

  delete() {
    this.dodelete().subscribe(result => {
      console.log('delete', result);
    });
    this.router.navigate(['jobs']);
  }

  dodelete() {
    this.loading = this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 3000
    }).then(loading => loading.present());

    return this.http.delete(`${environment.zosURL}/api/v1/zosmf/restjobs/jobs/${this.jobname}/${this.jobid}`, {
      headers: {
        'X-IBM-Job-Modify-Version': '1.0',
        'X-CSRF-ZOSMF-HEADER': '',
        'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
      }
    }).pipe(
      tap(res => {
        this.loadingController.dismiss();
        this.authService.showInfo(`Job ${this.jobname}(${this.jobid}) was deleted`);
      }),
      catchError(e => {
        let status = e.status;
        console.log(status)
        this.loadingController.dismiss();
        if (status === 401) {
          this.authService.showAlert('You are not authorized for this!');
          throw new Error(e);
        }
        throw new Error(e);
      })
    );
  }

  back() {
    let dtldata = this.jobname + ',' + this.jobid;
    this.router.navigate(['menu', dtldata]);
  }
}
