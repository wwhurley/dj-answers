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