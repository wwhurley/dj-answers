var djAnswers = angular.module('djAnswers', ['ngRoute', 'ui.router', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.alert', 'ngCookies']);
djAnswers.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function($urlRouterProvider, $locationProvider, $stateProvider) {
//  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  //Home page
  .state('home', {
    url : '/',
    templateUrl : 'home/index.html',
    controller : 'HomeController'
  })
  .state('bluebells', {
    url : '/bluebells',
    templateUrl : 'bluebells/index.html',
    controller : 'BluebellsController'
  })
  .state('bluebells.questionOne', {
    url : '/1',
    templateUrl : 'bluebells/question1.html'
  })
  .state('bluebells.questionTwo', {
    url : '/2',
    templateUrl : 'bluebells/question2.html'
  })
  .state('bluebells.questionThree', {
    url : '/3',
    templateUrl : 'bluebells/question3.html'
  })
}]);