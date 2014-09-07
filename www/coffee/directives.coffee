angular.module 'starter.directives', []

.directive 'directiveName', () ->
  restrict: 'E'
  template: '<div>directiveName</div>'
  link: (scope, iElement, iAttrs) ->
