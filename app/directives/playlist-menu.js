import template from './playlist-menu.jade';

function PlaylistMenu(playlistService, playerUiService, $mdDialog) {
  return {
    template:   template,
    restrict:   'E',
    scope: {
     filters: '=?',
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      scope.create = playerUiService.playlistDialog;
      scope.$root.$on('playlist.refresh', load);
      load();
      function load() {
        return playlistService.query(scope.filters).then(data => scope.results = data);
      }

    }
  };
}
export { PlaylistMenu as default }

