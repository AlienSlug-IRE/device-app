'use strict';

/**
 * @ngdoc overview
 * @name ubdAppApp
 * @description
 * # ubdAppApp
 *
 * Main module of the application.
 */
angular
  .module('ubdAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/new', {
        templateUrl: 'views/new.html'
      })
      .when('/project', {
        templateUrl: 'views/project.html'
      })
      .when('/open', {
        templateUrl: 'views/open.html'
      })
      .when('/details', {
        templateUrl: 'views/details.html'
      })
      .when('/nfc', {
        templateUrl: 'views/nfc.html'
      })
      .when('/base', {
        templateUrl: 'views/base.html',
      })
      .when('/led', {
        templateUrl: 'views/led.html',
      })
      .when('/test', {
        templateUrl: 'views/test.html',
      })
      .when('/command', {
        templateUrl: 'views/command.html',
        controller: 'CommandCtrl'
      })
      .when('/description', {
        templateUrl: 'views/description.html',
        controller: 'DescriptionCtrl'
      })
      .when('/cafe', {
        templateUrl: 'views/cafe.html',
        controller: 'CafeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
