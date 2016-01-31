import template from './playlist-menu.jade';

function PlaylistMenu(playlistService) {
  return {
    template:   template,
    restrict:   'E',
    scope: {
     filters: '=?'
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      playlistService.query(scope.filters)
      .then(data => scope.results = data)
    }
  }
}
export { PlaylistMenu as default }

