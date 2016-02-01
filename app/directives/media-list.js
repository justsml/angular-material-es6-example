import template from './media-list.jade';

function MediaList($document, mediaService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {
      filters: '=?',
      title:   '=?',
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      scope.title = scope.title || 'Media List';
      mediaService.query(scope.filters)
      .then(data => scope.results = data)
    }
  }
}
export { MediaList as default }

