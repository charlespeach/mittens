# Mittens!!! The AngularJS Demo

### NPM Packages

If you dont already have nodeJS and node package manager installed, just download the installer from the website (the `brew install nodejs npm` method is no longer recommended/supported)

* Install Yeoman `npm install -g yo`
* Install angular-generator `npm install -g generator-angular`

### Lets scaffold an app!

* `mkdir mittens && cd mittens`
* `yo angular mittens`
* follow the generators instructions

### Start auto-watchy-server-goodness

By default, if you generate a new AngularJS with yeoman generators, it will give you a HUGE grunt file, which already includes live reload etc etc.
To start a server:
* `grunt server`

### Lets playyy

At first AngularJS feels like magic. Like fire breathing dragons, totem pole kinda magic, none of this pulling rabbits out of a hat shit.

One of the things that first threw me off is how Dependency Injection works.

So lets take this function from mittens:

```
angular.module('mittensApp')
  .controller('GithubCtrl', function ($scope, $http) {
  	$http.get('https://api.github.com/repos/angular/angular.js/commits')
      .success(function(commits) {
        $scope.commits = commits
      })
  });
```

If I switch around `$scope` or `$http` everything will still just work. Whats going on here:

* Knows what services our controller function needs in each parameter slot
* Decides what object should “provide” each of the named services (eg. $httpProvider provides $http)
* Calls our controller with the appropriate providers in each slot

How does angular know what services our controller function needs in each param slot?

Lets take this example vanilla js function:


```
var divide = function(numerator, denominator) {
	return numerator / denominator;
}
```

Every object in javascript has a `toString()` method, so If I call `divide.toString()` I will see `""function (numerator, denominator) { return numerator / denominator; }"`

Angular takes this knowledge and does magic within the `annotate` function:

```
$inject = [];
fnText = fn.toString().replace(STRIP_COMMENTS, '');
argDecl = fnText.match(FN_ARGS);
forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg){
  arg.replace(FN_ARG, function(all, underscore, name){
    $inject.push(name);
  });
});
fn.$inject = $inject;
// ...
return $inject;
```

So whats this doing?

* Uses the toString() function to get back the definition of the function
* Does a regular expression to find the functions signature
* Loop through all the params and save their names in an array
* return the array of param names

This is why when you minify angular it no longer works! Angular is relying on the `toString()` to figure out where to inject dependencies from!