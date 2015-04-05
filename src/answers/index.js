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