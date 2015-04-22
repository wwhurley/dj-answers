var djAnswers = angular.module('djAnswers', ['ngRoute', 'ui.router', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.alert', 'ngCookies']);
djAnswers.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function($urlRouterProvider, $locationProvider, $stateProvider) {
//  $locationProvider.html5Mode(true);
  
  $urlRouterProvider.otherwise('/burnside/1');
  
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
  .state('burnside', {
    url : '/burnside',
    templateUrl : 'burnside/index.html',
    controller : 'BurnsideController'
  })
  .state('burnside.questionOne', {
    url : '/1',
    templateUrl : 'burnside/question1.html'
  })
  .state('burnside.questionTwo', {
    url : '/2',
    templateUrl : 'burnside/question2.html'
  })
  .state('burnside.questionThree', {
    url : '/3',
    templateUrl : 'burnside/question3.html'
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
  $scope.enabled = answers.getEnabled();
  answers.setEnabled('bluebells.questionOne');
  
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $scope.answer = '';
    $scope.alerts = [];
    $scope.correctAnswer = false;
    $scope.showHint = false;
    
    if (!answers.isEnabled(toState.name)) {
      $state.go('bluebells.questionOne');
    }
  });
  
  $scope.checkAnswer = function(test, errorMsg, next) {
    answers.compare($scope.answer, test)
    .then(function() {
      var ref = $state.href(next);
      $scope.correctAnswer = true;
      $scope.showHint = false;
      
      var msg = "That's the right answer!";
      
      if (next) {
        msg += ' Try the <a href="' + ref + '">next question</a>';
      }
      $scope.alerts = [{
        type : 'success',
        msg : msg
      }];

      answers.setEnabled(next);
    })
    .catch(function() {
      $scope.correctAnswer = false;
      $scope.showHint = true;
      
      $scope.alerts = [{
        type : 'danger',
        msg : errorMsg
      }];
    });
    
    $scope.enabled = answers.getEnabled();
  }
  
  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}]);
angular.module('djAnswers').controller('BurnsideController', ['$scope', 'answers', '$state', function($scope, answers, $state) {
  $scope.enabled = answers.getEnabled();
  answers.setEnabled('burnside.questionOne');
  
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $scope.answer = '';
    $scope.alerts = [];
    $scope.correctAnswer = false;
    $scope.showHint = false;
    
    if (!answers.isEnabled(toState.name)) {
      $state.go('burnside.questionOne');
    }
  });
  
  $scope.checkAnswer = function(test, errorMsg, next) {
    answers.compare($scope.answer, test)
    .then(function() {
      var ref = $state.href(next);
      $scope.correctAnswer = true;
      $scope.showHint = false;
      
      var msg = "That's the right answer!";
      
      if (next) {
        msg += ' Try the <a href="' + ref + '">next question</a>';
      }
      $scope.alerts = [{
        type : 'success',
        msg : msg
      }];

      answers.setEnabled(next);
    })
    .catch(function() {
      $scope.correctAnswer = false;
      $scope.showHint = true;
      
      $scope.alerts = [{
        type : 'danger',
        msg : errorMsg
      }];
    });
    
    $scope.enabled = answers.getEnabled();
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
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form><p>Deep in the forest the fairies do dwell<br>These flowers bring magic and ring like a bell<br></p><p>They grow near water and their petals are blue<br>The fairies wear boots and so should you.</p><p>An enchanted forest is not far away<br>Name this spring flower to brighten your day</p><p><input class=form-control rows=5 ng-model=$parent.answer></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['bluebell', 'bluebells'], 'Oops, that\\'s not quite right. Here\\'s a <a href=\\'http://www.lair2000.net/fairy_spring_poems/spring_poems/bluebell.html\\' target=\\'_blank\\'>hint</a>', 'bluebells.questionTwo')\" role=button>Answer</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!correctAnswer><p>Become the Bluebell Fairy King with <a href=\"http://www.hellobee.com/2012/05/30/diy-felt-crown/\" target=_blank>this felt crown</a>.</p><a href=\"http://www.hellobee.com/2012/05/30/diy-felt-crown/\" target=_blank><img src=http://www.hellobee.com/wp-content/uploads/2012/05/diy-felt-crown-c.jpg class=\"img-responsive\"></a></div></div></div></div>"
  );


  $templateCache.put('bluebells/question2.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form class=form-inline><p>Miss Mary Mack<br>All dressed in black<br>with silver <input class=form-control ng-model=$parent.answer placeholder=\"Enter answer here\"><br>all down her back.</p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['buttons'], 'Oops, that\\'s not quite right. Here\\'s a <a href=\\'https://www.youtube.com/watch?v=Rz6gUgRK5So\\' target=\\'_blank\\'>hint</a>', 'bluebells.questionThree')\" role=button>Answer</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!correctAnswer><p>Learn to play Miss Mary Mack with this tutorial:</p><div class=\"embed-responsive embed-responsive-16by9\"><iframe src=https://www.youtube.com/embed/q-Xcw3T-vQs frameborder=0 allowfullscreen></iframe></div></div></div></div></div>"
  );


  $templateCache.put('bluebells/question3.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form><p>A, B, C. It's easy as 1, 2, 3.<br>You can solve this mystery<br>With 1, 2, 3 as A, B, C.<br></p><p>13 &#8226; 5 &#8226; 18 &#8226; 18 &#8226; 9 &#8226; 13 &#8226; 1 &#8226; 3</p><p>6 &#8226; 1 &#8226; 18 &#8226; 13</p><p>2 &#8226; 12 &#8226; 21 &#8226; 5 &#8226; 2 &#8226; 5 &#8226; 12 &#8226; 12</p><p>6 &#8226; 5 &#8226; 19 &#8226; 20 &#8226; 9 &#8226; 22 &#8226; 1 &#8226; 12</p><p><input class=form-control rows=5 ng-model=$parent.answer></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['Merrimac farm bluebell festival'], 'Oops, that\\'s not quite right. Check out some hints below.')\" role=button>Answer</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!correctAnswer><h2>Congratulations!</h2><p>Get your passports ready and travel <a href=http://www.pwconserve.org/merrimacfarm/directions.html target=_blank>this way</a>.</p><p>We'll be at the bluebells to explore and to play</p><p><a href=http://www.pwconserve.org/merrimacfarm/bluebellfestival/index.html target=_blank>Bluebell Festival at Merrimac Farm</a></p>Stamping available April 12, 2015, from 10:00am to 4:00pm only!</div><div collapse=!showHint><p><h2>Hint</h2>A = 1<br>B = 2<br>C = 3<br>D = 4<br>E = 5<br>F = 6<br>G = 7<br>H = 8<br>I = 9<br>J = 10<br>K = 11<br>L = 12<br>M = 13<br>N = 14<br>O = 15<br>P = 16<br>Q = 17<br>R = 18<br>S = 19<br>T = 20<br>U = 21<br>V = 22<br>W = 23<br>X = 24<br>Y = 25<br>Z = 26</p></div></div></div></div>"
  );


  $templateCache.put('burnside/index.html',
    "<nav class=\"navbar navbar-default\"><div class=container-fluid><div class=\"collapse navbar-collapse\" id=bs-example-navbar-collapse-1><ul class=\"nav navbar-nav\"><li ui-sref-active=active><a ui-sref=burnside.questionOne>Question 1</a></li><li ui-sref-active=active ng-class=\"{disabled : enabled.indexOf('burnside.questionTwo') == -1}\"><a ui-sref=burnside.questionTwo>Question 2</a></li><li ui-sref-active=active ng-class=\"{disabled : enabled.indexOf('burnside.questionThree') == -1}\"><a ui-sref=burnside.questionThree>Question 3</a></li></ul></div></div></nav><ui-view></ui-view>"
  );


  $templateCache.put('burnside/question1.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form><p>Roses are red. Violets are blue.<br>In Holland, they wear this kind of shoe?</p><p><input class=form-control rows=5 ng-model=\"$parent.answer\"></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['wooden', 'wood', 'klomp', 'klompen'], 'Oops, that\\'s not quite right. Here\\'s a <a href=\\'http://superbeefy.com/why-do-the-dutch-wear-wooden-shoes/\\' target=\\'_blank\\'>hint</a>', 'burnside.questionTwo')\" role=button>Answer</a> <a class=hint href=\"http://superbeefy.com/why-do-the-dutch-wear-wooden-shoes/\" target=_blank>Need a hint?</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!correctAnswer><p>Dress up in a <a href=http://www.hvanrossum.com/costume.html target=_blank>traditional costume!</a></p><a href=http://www.hvanrossum.com/costume.html target=_blank><img src=http://www.hvanrossum.com/costumekl.gif class=\"img-responsive\"></a></div></div></div></div>"
  );


  $templateCache.put('burnside/question2.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form class=form-inline><p>Flowers have families like you and like me.<br>Tulips are true bulbs which means they live in what family?</p><p><input class=form-control rows=5 ng-model=\"$parent.answer\"></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['lily'], 'Oops, that\\'s not quite right. Here\\'s a <a href=\\'http://www.botanical-online.com/familialiliaceasangles.htm\\' target=\\'_blank\\'>hint</a>', 'burnside.questionThree')\" role=button>Answer</a> <a class=hint href=http://www.botanical-online.com/familialiliaceasangles.htm target=_blank>Need a hint?</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!correctAnswer><p><a href=http://www.kidsgardening.org/node/12167 target=_blank>Learn about bulbs</a>.</p><p><a href=http://candiceashmentart.blogspot.com/2012/05/field-of-tulips-hand-art-kindergarten.html target=_blank>Create a tulip field with your family!</a></p><a href=http://candiceashmentart.blogspot.com/2012/05/field-of-tulips-hand-art-kindergarten.html target=_blank><img src=http://2.bp.blogspot.com/-X_IF-SazeRA/T7vVLYZ-qKI/AAAAAAAABZM/rP9rFAPqr88/s640/100_8534.JPG class=\"img-responsive\"></a></div></div></div></div>"
  );


  $templateCache.put('burnside/question3.html',
    "<div class=jumbotron><alert ng-repeat=\"alert in alerts\" type={{alert.type}} close=closeAlert($index)><span ng-bind-html=alert.msg></span></alert><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><form><p>This building is a machine that runs only on air.<br>With four large sails it travels nowhere.</p><p><input class=form-control rows=5 ng-model=\"$parent.answer\"></p><p><a class=\"btn btn-primary btn-lg\" ng-click=\"checkAnswer(['windmill', 'windmills'], 'Oops, that\\'s not quite right. Check out the hint below.')\" role=button>Answer</a> <a class=hint ng-click=\"$parent.showHint = true\">Need a hint?</a></p></form></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div collapse=!showHint><img src=https://postmediamontrealgazette2.files.wordpress.com/2013/03/1276051231_98879510_5-don-quijote-de-la-mancha-malaga-1276051231.jpg class=\"img-responsive\"></div><div collapse=!correctAnswer><p>Congratulations! You can be on your way.<br>Head over to <a href=\"http://www.burnsidefarms.com/\" target=_blank>Burnside</a> and discover a beautiful day</p><p><a href=http://30minutecrafts.com/2014/06/printable-windmill.html target=_blank>Make your own windmill!</a></p></div></div></div></div>"
  );


  $templateCache.put('home/index.html',
    "<a ui-sref=bluebells.test>Test</a>"
  );

}]);
