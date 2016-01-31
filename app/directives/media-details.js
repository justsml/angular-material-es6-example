import template from './media-details.jade';

function MediaDetails($document, mediaService) {
  return {
    template: template,
    restrict: 'E',
    scope: { media: '=?' },
    link(scope, el, attrs) {
      // scope.get    = mediaService.get
      // scope.query  = mediaService.query
      scope.create = mediaService.create
      scope.save   = mediaService.save
      scope.remove = mediaService.remove
    }
  }
}

export { MediaDetails as default }
