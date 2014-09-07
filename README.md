Ionic-Coffee-Scss App Base
=====================

Go to [Additional Stuff](#additional-stuff) for quick start  
A starting project for Ionic that optionally supports using custom SCSS.  
The scaffold is made from [ionicframework](http://ionicframework.com/getting-started/)  
And add some refinements.   

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
