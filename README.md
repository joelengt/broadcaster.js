Broadcaster
=============

The aim of this project is to provide a fast and easy way for communication
between multiple objects.

If you’re interested in broadcaster.js then feel free to follow me on twitter
([@juliocanares](https://twitter.com/juliocanares)) and I will keep you posted!


### Road Map ###

* Create a Typescript definition file for Broadcaster.js
* Add features removeAllByTypeEvent and removeAllEvents

### Contribute ###

Want to be part of the broadcaster.js project? Great! All are welcome! We will get there quicker together :]

### How to build ###

Broadcaster is built with Gulp. If you don't already have this, go install Node and NPM then install Gulp.

```
$ npm install --global gulp
```

Then, in the folder where you have downloaded the source, install the build dependencies using npm:

```
$> npm install
```

Then build:

```
$> gulp
```

This will create a minified version at bin/broadcaster.min.js

### Current features ###

- addEventListener , removeEventListener , hasEventListener and dispatchEvent
- pass data when dispatch an event

Usage
=============
- first add the broadcaster script in your html
```html
  <head>
  </head>
  <body>
    <!-- Broadcaster.js -->
    <script src="bin/broadcaster.min.js"></script>
  </body>
```
#### Basic ####

```javascript
    var goProfileHandler = function (parameters) {
            console.log(parameters); // {type:"GO_PROFILE" , user_id:100}
    };

    //addEventListener
    Broadcaster.addEventListener("GO_PROFILE", goProfileHandler);

    //dispatchEvent
    Broadcaster.dispatchEvent("GO_PROFILE", {user_id: 100});

    //hasEventListener
    console.log(Broadcaster.hasEventListener("GO_PROFILE", goProfileHandler)); // true;

    //removeEventListener
    Broadcaster.removeEventListener("GO_PROFILE", goProfileHandler);
```

#### Objects ####

```javascript
    /**
     * check that there is not reference between watch , developer and dog objects.
     * broadcaster is global event emitter , is magic :]
     */

    var APP = APP || {};

    //--- Watch
    APP.Watch = function () {
        var timer = setTimeout(function () {
            clearTimeout(timer);
            Broadcaster.dispatchEvent("TIMER_COMPLETE", {message: "from watch"});
        }, 3000);
    };

    //--- Developer
    APP.Developer = function () {
        Broadcaster.addEventListener("TIMER_COMPLETE", this.timeCompleteHandler);
    };
    APP.Developer.prototype.timeCompleteHandler = function (parameters) {
        console.log("is time for code --> ", parameters);
    };

    //--- Dog
    APP.Dog = function () {
        Broadcaster.addEventListener("TIMER_COMPLETE", this.timeCompleteHandler);
    };
    APP.Dog.prototype.timeCompleteHandler = function (parameters) {
        console.log("is time for food --> ", parameters);
    };

    //the watch object dispatch the event "TIMER_COMPLETE" when time is completed.
    var watch = new APP.Watch();

    //developer and dog object is waiting for listen the "TIMER_COMPLETE" event
    new APP.Developer();
    new APP.Dog();
```

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
