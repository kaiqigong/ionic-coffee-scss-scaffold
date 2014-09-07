angular.module 'starter.filters', []
.filter 'htmlToPlaintext', ->
  (input) ->
    String(input).replace(/<[^>]+>/gm, '')
