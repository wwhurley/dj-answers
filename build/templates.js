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
