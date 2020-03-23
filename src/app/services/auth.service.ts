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

import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoadingController } from '@ionic/angular';

const TOKEN_KEY = 'access_token';
const TOKEN_KEY_APIML = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  port = environment.port;
  user = null;
  pass = null;
  authenticationState = new BehaviorSubject(false);
  results: any;
  login_id = null;
  loading;

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private loadingController: LoadingController) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  load() {
    this.loading = this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 3000
    }).then(loading => loading.present());
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  login(credentials) {
    console.log('login info:', credentials);

    this.load();

    return this.http.post(`${credentials.url}/api/v1/gateway/auth/login`, JSON.stringify(credentials), {observe: 'response'})
      .pipe(
        tap(res => {
          console.log('im in', res);
          this.loadingController.dismiss();
          if (!res.ok) {
            console.log('res:', res);
            this.showAlert('Response not 2xx!');
            console.error('Response not 2xx');
            return throwError;
          }
          environment.zosURL = credentials.url;
          environment.user = credentials.username;
          environment.pass = credentials.password;
          this.showGetStarted('Welcome to Zowe Mobile Application!');
          this.authenticationState.next(true);
        }),
        catchError(e => {
          console.log('err', e);
          const status = e.status;
          this.loadingController.dismiss();
          // if (status === 0) {
          //   console.log ('Allow this for now... Status:', status);
          //   this.authenticationState.next(true);
          // } else {
          console.log('err stat: ', status);
          this.showAlert('You are not authorized for this!');
          return throwError(e);
          // }
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      environment.zosURL = null;
      environment.user = null;
      environment.pass = null;
      this.authenticationState.next(false);
    });
  }

  getSpecialData() {
    return this.http.get(`${environment.zosURL}/api/v1//zosmf/info`).pipe(
      catchError(e => {
        let status = e.status;
        console.log(status);
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    );
  }

  getJobsData(searchForm) {
    // const headers = new HttpHeaders();
    // headers.append('Accept', 'application/json')
    // const base64Credential: string = btoa( user.username + ':' + user.password);
    // headers.append('Authorization', 'Basic ' + base64Credential);

    let query = `${environment.zosURL}/api/v1/zosmf/restjobs/jobs`;
    if (searchForm.owner==="") {
        query += '?' + `owner=${environment.user}`;
    } else {
      query += '?' + `owner=${searchForm.owner}`;
    }
    if (searchForm.prefix!=="") {
        query += '&' + `prefix=${searchForm.prefix}`;
    }
    if (searchForm.jobid!=="") {
        query += '&' + `jobid=${searchForm.jobid}`;
    }
    console.log(query);

    this.load();
    return this.http.get(query, {
      observe: 'response',
      headers: {
        Authorization: 'Basic ' + btoa(environment.user + ':' + environment.pass),
        'X-CSRF-ZOSMF-HEADER': ''
      }
    }).pipe(
        tap(res => {
          this.loadingController.dismiss();
          if (!res.ok) {
            console.error("Response not 2xx");
            return throwError;
          }
        }),
        catchError(e => {
          this.loadingController.dismiss();
          return throwError(e);
        })
    );
  }

  viewJobsData(jobname, jobid) {
    this.load();
    return this.http.get(`${environment.zosURL}/api/v1/zosmf/restjobs/jobs/${jobname}/${jobid}/files`, {
      headers: {
        'X-CSRF-ZOSMF-HEADER': '',
        'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
      },
      responseType: 'text'
    })
      .pipe(
        tap(res => {
            this.loadingController.dismiss();
        }),
        catchError(e => {
        this.loadingController.dismiss();
        return throwError(e);
      })
    );
  }

  getFilesData() {
    // const headers = new HttpHeaders();
    // headers.append('Accept', 'application/json')
    // const base64Credential: string = btoa( user.username + ':' + user.password);
    // headers.append('Authorization', 'Basic ' + base64Credential);

      return this.http.get(`${environment.zosURL}/api/v1/zosmf/restfiles/ds?dslevel=PRODUCT.TDM.DEMO.*`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
        }
      }).pipe(
      catchError(e => {
        console.log("err", e.status)
        let status = e.status;
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }

  getAPIMLData() {
    const base64Credential: string = btoa(environment.user + ':' + environment.pass);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Basic ' + base64Credential // ,
      // 'X-CSRF-ZOSMF-HEADER' : ''
    });

    // console.log("auth_serv: APIML", JSON.stringify(body), headers)
    return this.http.get(
      `${environment.zosURL}/api/v1/apicatalog/containers`,
      { 
        headers,
        observe: 'response'
      })
      .pipe(
        tap(res => {
          console.log(res.status);
          console.log(res.body);
        }),
        catchError(e => {
          return throwError(e);
        })
      );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  showInfo(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Information',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  showGetStarted(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Welcome',
      buttons: ['Get Started']
    });
    alert.then(alert => alert.present());
  }

  restartJob(jobname, jobid) {
    console.log("restart j", jobname, jobid, this.url, this.port);
    this.load();
    return this.http.get(`${environment.zosURL}/api/v1/zosmf/restjobs/jobs/${jobname}/${jobid}/files/JCL/records`, {
      headers: {
        'X-CSRF-ZOSMF-HEADER': '',
        'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
      },
      responseType: 'text'
    }).pipe(
      tap(res => {
        this.loadingController.dismiss();
      }),
      catchError(e => {
        let status = e.status;
        console.log(status)
        this.loadingController.dismiss();
        if (status === 401) {
          this.showAlert('You are not authorized for this!');
          this.logout();
        }
        throw new Error(e);
      })
    )
  }

  submitJob(jobname, jobid, JCLdata) {
    console.log("submit j", jobname, jobid, this.url, this.port);
    this.load();
    return this.http.post(`${environment.zosURL}/api/v1/jobs/string`, {
        "jcl": JCLdata
      }, {observe: 'response',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.pass)
      }}).pipe(
      tap(res => {
          this.loadingController.dismiss();
          if (!res.ok) {
            console.error("Response not 2xx");
            return throwError;
          }
        }),
        catchError(e => {
          this.loadingController.dismiss();
          return throwError(e);
        })
    );
  }
  getJobInfo(jobname, jobid) {
    // Getting basic info about one job
    const query = `${environment.zosURL}/api/v1/zosmf/restjobs/jobs/${jobname}/${jobid}`;
    console.log(query);
    this.load();
    return this.http.get(query, {
      observe: 'response',
      headers: {
        Authorization: 'Basic ' + btoa(environment.user + ':' + environment.pass),
        'X-CSRF-ZOSMF-HEADER': ''
      }
    }).pipe(
        tap(res => {
          this.loadingController.dismiss();
          if (!res.ok) {
            console.error("Response not 2xx");
            return throwError;
          }
        }),
        catchError(e => {
          this.loadingController.dismiss();
          return throwError(e);
        })
    );
  }
}