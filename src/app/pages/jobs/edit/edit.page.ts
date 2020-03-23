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

import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  jobname: any;
  jobid: any;
  data: any;
  jcl: any;
  respBody: any;
  loading: any;
  constructor(private authService: AuthService, private router: Router, public activeRoute: ActivatedRoute,
              private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.jobname = this.activeRoute.snapshot.paramMap.get('name');
    this.jobid = this.activeRoute.snapshot.paramMap.get('id');
    this.authService.restartJob(this.jobname, this.jobid).subscribe(result => {
      this.data = result;
  });
}
  submit() {

      this.authService.submitJob(this.jobname, this.jobid, this.jcl).subscribe(result => {
      console.log('subinit: ', result);
      this.respBody = { ...result.body };
      console.log(this.respBody);
      this.showAlert(`Job ${this.respBody.jobName}(${this.respBody.jobId}) submitted`);
      // it's not waiting for the response
      const dtldata = this.respBody.jobName + ',' + this.respBody.jobId;
      this.router.navigate(['menu', dtldata]);
      });
  }

  back() {
    let dtldata = this.jobname + ',' + this.jobid;
    this.router.navigate(['menu', dtldata]);
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Submitted',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
  
}
