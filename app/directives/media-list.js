import template from './media-list.jade';

function MediaList($document, mediaService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {
      filters: '=?'
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      mediaService.query(scope.filters)
      .then(data => scope.results = data)
    }
  }
}
export { MediaList as default }

