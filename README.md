# Zowe Mobile Application

The Zowe Mobile Application lets you interact with your Zowe instance running on the mainframe. You can login using your mainframe credentials and be authenticated using the [API Mediation Layer Security](https://docs.zowe.org/v1-3-x/extend/extend-apiml/api-mediation-security.html). You can check the status of all the Zowe services [discovered](https://docs.zowe.org/v1-3-x/getting-started/overview.html#api-mediation-layer) by the API Mediation Layer. You can access the [Jobs services](https://docs.zowe.org/v1-3-x/getting-started/overview.html#z-os-services), view jobs in the spool, view their spool files, restart jobs, edit JCL taken from the spool and submit it, delete jobs from the spool, and cancel running jobs. 

Interacting with Zowe from your mobile is now within reach.

The Zowe Mobile Application app is powered by Zowe.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Zowe](https://www.zowe.org/)
* [Ionic](https://ionicframework.com/)
* [Node and NPM](https://nodejs.org/)

### Installing and Running the App

* Install the ionic CLI globally: `npm install -g ionic`
* Clone this repository.
* Go to app folder: `cd app`
* Run `npm install` from the /app directory.
* Run `ionic serve` in a terminal. This starts a local dev server for app dev/testing
* Profit. :tada:

## App Preview

**Tip:** All app preview screenshots were taken by running `ionic serve --lab` on a retina display.

- Main Menu

  <img src="app/resources/mobile%20screenshots/main%20menu.PNG" alt="Main Menu" width="40%" height="40%">

- Zowe Services

  <img src="app/resources/mobile%20screenshots/Zowe%20Services.PNG" alt="Zowe Services" width="40%" height="40%">

- Jobs Menu

  <img src="app/resources/mobile%20screenshots/Jobs%20Detailed%20View.PNG" alt="Detailed Jobs" width="40%" height="40%">

**Tip:** To see more images of the app, check out the [screenshots directory](/app/resources/mobile%20screenshots)!

## Authors

Created by the Ctrl+Z team for Broadcom's Zowe Hackathon 2019
