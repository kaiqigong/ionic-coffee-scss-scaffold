Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run:

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.

## Additional stuff
+ Added coffee and scss support  
+ Auto inject bower js,css to index.html  
+ Auto inject compiled js/css to index.html
+ Auto inject custom scss to scss/app.scss

## Pre-requests
```sudo npm install -g cordova ionic```  
```sudo npm install -g gulp```  
```cordova platform add ios```  
```sudo npm install -g ios-sim```

## Usage
+ Clone this repo  
```
cd proDir
npm install
gulp install
npm start // will compile coffee, scss, inject, watch and start server at :8100
ionic build ios // build ios
ionic emulate ios // emulate
```
+ The gulp use liveload, install this [plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) for chrome. 

## Contribution
+ Feel free to make pull requests!
