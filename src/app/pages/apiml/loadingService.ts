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

import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    currentLoading = null;

    constructor(public loadingController: LoadingController) {
    }

    async present(message: string = null, duration: number = null) {

        // Dismiss previously created loading
        if (this.currentLoading != null) {
            this.currentLoading.dismiss();
        }

        this.currentLoading = await this.loadingController.create({
            duration: duration,
            message: message
        });

        return await this.currentLoading.present();
    }

    async dismiss() {
        if (this.currentLoading != null) {

            await this.loadingController.dismiss();
            this.currentLoading = null;
        }
        return;
    }

}