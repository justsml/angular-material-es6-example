import template from './playlist-menu.jade';

function PlaylistMenu(playlistService, playerUiService, sampleDataService) {
  return {
    template:   template,
    restrict:   'E',
    scope: {
     filters: '=?',
    },
    link: (scope, el, attrs) => {
      scope.$root.$on('playlist.refresh', load);
      scope.filters = scope.filters || {};
      scope.create = playerUiService.playlistDialog;
      scope.select = playerUiService.currentPlaylist;

      load();
      function load() {
        return playlistService.query(scope.filters)
          .then(data => {
            scope.results = data;
            if (!data || data.length <= 0) {
              sampleDataService.prompt();
            }
          });
      }

    }
  };
}
export { PlaylistMenu as default }

