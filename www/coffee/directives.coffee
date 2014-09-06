angular.module 'starter.directives', []

.directive 'directiveName', (injectables) ->
  restrict: 'E'
  template: '<div>directiveName</div>'
  link: (scope, iElement, iAttrs) ->
