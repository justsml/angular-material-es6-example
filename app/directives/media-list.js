import template from './media-list.jade';

function MediaList($document, mediaService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      mediaService.query(scope.filters)
      .$then(data => scope.results = data)
    }
  }
}
export { MediaList as default }

