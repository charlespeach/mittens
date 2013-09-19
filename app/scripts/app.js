'use strict';

angular.module('mittensApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/github', {
        templateUrl: 'views/github.html',
        controller: 'GithubCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
