var djAnswers = angular.module('djAnswers', ['ngRoute', 'ui.router', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.alert', 'ngCookies']);
djAnswers.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function($urlRouterProvider, $locationProvider, $stateProvider) {
//  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/bluebells/1');
  
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
angular.module('djAnswers').service('answers', [ '$filter', '$q', '$cookies', function($filter, $q, $cookies) {
  var service = {
    enabled : null,
    
    getEnabled : function() {
      if (null == service.enabled) {
        service.enabled = $cookies.enabledQuestions;
        service.enabled = service.enabled || [];
        
        if (!angular.isArray(service.enabled)) {
          service.enabled = service.enabled.split(',');
        }
      }
      
      return service.enabled;
    },
    setEnabled : function(state) {
      var enabled = service.getEnabled();
      
      if (enabled.indexOf(state) == -1) {
        enabled.push(state);
      }
      
      service.enabled = enabled;
      $cookies.enabledQuestions = enabled;
    },
    isEnabled : function(state) {
      var enabled = service.getEnabled();
      
      return (enabled.indexOf(state) != -1);
    },
    compare : function(answer, test) {
      var defer = $q.defer();
      var found = false;
      
      angular.forEach(test, function(check) {
        if ($filter('lowercase')(answer.trim()) == $filter('lowercase')(check)) {
          found = true;
        }
      });
      
      if (found) {
        defer.resolve();
      }
      else {
        defer.reject();
      }
      
      return defer.promise;
    }
  };
  
  return service;
}]);
angular.module('djAnswers').controller('BluebellsController', ['$scope', 'answers', '$state', function($scope, answers, $state) {
  $scope.answer = '';
  $scope.alerts = [];
  $scope.correctAnswer = false;
  $scope.showHint = false;
  $scope.enabled = answers.getEnabled();
  answers.setEnabled('bluebells.questionOne');
  
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!answers.isEnabled(toState.name)) {
      $state.go('bluebells.questionOne');
    }
  });
  
  $scope.checkAnswer = function(test, next) {
    answers.compare($scope.answer, test)
    .then(function() {
      var ref = $state.href(next);
      $scope.correctAnswer = true;
      $scope.showHint = false;
      
      $scope.alerts = [{
        type : 'success',
        msg : 'That\'s the right answer! Try the <a href="' + ref + '">next question</a>'
      }];

      answers.setEnabled(next);
    })
    .catch(function() {
      $scope.correctAnswer = false;
      $scope.showHint = true;
      
      $scope.alerts = [{
        type : 'danger',
        msg : 'Oops, here\'s a <a href="http://www.google.com" target="_blank">hint</a>'
      }];
    });
    
    $scope.enabled = answers.getEnabled();
    console.log($scope.enabled);
  }
  
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}]);
angular.module('djAnswers').controller('HomeController', ['$scope', function($scope) {
}]);
angular.module('djAnswers').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('bluebells/index.html',
    "<nav class=\"navbar navbar-default\"><div class=container-fluid><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav\"><li ui-sref-active=active><a ui-sref=bluebells.questionOne>Question 1</a></li><li ui-sref-active=active ng-class=\"{disabled : enabled.indexOf('bluebells.questionTwo') == -1}\"><a ui-sref=bluebells.questionTwo>Question 2</a></li><li ui-sref-active=active ng-class=\"{disabled : enabled.indexOf('bluebells.questionThree') == -1}\"><a ui-sref=bluebells.questionThree>Question 3</a></li></ul></div></div></nav><ui-view></ui-view>"
  );


  $templateCache.put('bluebells/question1.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=col-md-6><p>Deep in the forest the fairies do dwell<br>These flowers bring magic and ring like a bell<br></p><p>They grow near water and their petals are blue<br>The fairies wear boots and so should you.</p><p>An enchanted forest is not far away<br>Name this spring flower to brighten your day</p><p><input class=form-control rows=5 ng-model=$parent.answer></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['bluebell', 'bluebells'], 'bluebells.questionTwo')\" role=button>Answer</a></p></div><div class=col-md-6><div collapse=!correctAnswer><h3>Yay</h3></div></div></div><div collapse=!showHint><h2>Hint</h2></div></div>"
  );


  $templateCache.put('bluebells/question2.html',
    "<div class=jumbotron><h1>Question 2</h1><p>Lorem ipsum</p><p><textarea class=form-control rows=5></textarea></p><p><a class=\"btn btn-primary btn-lg\" href=# role=button>Answer</a></p></div>"
  );


  $templateCache.put('bluebells/question3.html',
    "<div class=jumbotron><h1>Question 3</h1><p>Lorem ipsum</p><p><textarea class=form-control rows=5></textarea></p><p><a class=\"btn btn-primary btn-lg\" href=# role=button>Answer</a></p></div>"
  );


  $templateCache.put('home/index.html',
    "<a ui-sref=bluebells.test>Test</a>"
  );

}]);
