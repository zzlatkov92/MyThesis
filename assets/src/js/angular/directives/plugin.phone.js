myApp.directive('phoneNumber', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, el, atts, ngModel) {
      
      /* called when model is changed from the input element */
      ngModel.$parsers.unshift(function(viewValue) {
        
        var numbers = viewValue.replace(/\D/g, ''),
            char = {0:'(',3:') ',6:' - '};
        numbers = numbers.slice(0, 10);
        viewValue = '';
        
        for (var i = 0; i < numbers.length; i++) {
            viewValue += (char[i]||'') + numbers[i];
        }
        
        // set the input to formatted value
        el.val(viewValue);
        
        return viewValue;
      });

      /* called when model is changed outside of the input element */
      ngModel.$formatters.push(function(modelValue) {
        return modelValue; 
      });
      
      /* called when the model changes, if validation fails the model value won't be assigned */
      ngModel.$validators.phone = function(modelValue, viewValue) {
        if (modelValue) {
          return modelValue.match(/\d/g).length === 10; 
        } else {
          return false;
        }
      }
      
    }
  }
});