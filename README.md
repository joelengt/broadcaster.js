Broadcaster
=============

The aim of this project is to provide a fast and easy way for communication
between multiple objects and removing hard references.

### Size ###

<table>
    <thead>
        <tr>
            <td>Minified</td>
            <td>Gzipped</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align='right'>602 B</td>
            <td align='right'>320 B</td>
        </tr>
    </tbody>
</table>

### Current features ###

- addEventListener, removeEventListener, hasEventListener and dispatchEvent
- pass data when dispatch an event

Usage
=========

- using node.js

``` javascript
  var Broadcaster = require('broadcaster.js');
```

- first add the broadcaster script in your html
```html
  <head>
  </head>
  <body>
    <script src='/dist/broadcaster.min.js'></script>
  </body>
```
#### Basic ####

```javascript
    var showProfile = function (parameters) {
            console.log(parameters); // {type:'SHOW_PROFILE' , user_id:100}
    };

    //addEventListener
    Broadcaster.addEventListener('SHOW_PROFILE', showProfile);

    //dispatchEvent
    Broadcaster.dispatchEvent('SHOW_PROFILE', {user_id: 100});

    //hasEventListener
    console.log(Broadcaster.hasEventListener('SHOW_PROFILE', showProfile)); // true;

    //removeEventListener
    Broadcaster.removeEventListener('SHOW_PROFILE', showProfile);
```

#### Objects ####

```javascript
    /**
     * check that there is not reference between watch , developer and dog objects.
     * broadcaster is global event emitter     */

    var APP = APP || {};

    //--- Watch
    APP.Watch = function () {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            Broadcaster.dispatchEvent('TIMER_COMPLETE', {message: 'from watch'});
        }, 3000);
    };

    //--- Developer
    APP.Developer = function () {
        Broadcaster.addEventListener('TIMER_COMPLETE', this.timeCompleteHandler);
    };
    APP.Developer.prototype.timeCompleteHandler = function (parameters) {
        console.log('is time for code --> ', parameters);
    };

    //--- Dog
    APP.Dog = function () {
        Broadcaster.addEventListener('TIMER_COMPLETE', this.timeCompleteHandler);
    };
    APP.Dog.prototype.timeCompleteHandler = function (parameters) {
        console.log('is time for food --> ', parameters);
    };

    //the watch object dispatch the event 'TIMER_COMPLETE' when time is completed.
    var watch = new APP.Watch();

    //developer and dog object is waiting for listen the 'TIMER_COMPLETE' event
    new APP.Developer();
    new APP.Dog();
```


### Road Map ###

* Add features removeAllByTypeEvent and removeAllEvents

### Contribute ###

Want to be part of the broadcaster.js project? Great! All are welcome! We will get there quicker together :]

### How to build ###

Broadcaster is built with Gulp. If you don't already have this, go install Node and NPM then install Gulp.

```
$ npm install -g gulp
```

Then, in the folder where you have downloaded the source, install the build dependencies using npm:

```
$> npm install
```

Then build:

```
$> gulp
```

This will create a minified version at dist/broadcaster.min.js
