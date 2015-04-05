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