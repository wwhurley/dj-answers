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


  $templateCache.put('home/index.html',
    "<a ui-sref=bluebells.test>Test</a>"
  );

}]);
