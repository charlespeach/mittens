'use strict';

angular.module('mittensApp')
  .controller('GithubCtrl', function ($scope, $http) {
  	$http.get('https://api.github.com/repos/angular/angular.js/commits')
      .success(function(commits) {
        $scope.commits = commits
      })
  });
