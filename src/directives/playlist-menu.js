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
      scope.filters         = scope.filters || {};
      scope.create          = playerUiService.playlistDialog;
      scope.select          = playerUiService.currentPlaylist;
      scope.currentPlaylist = () => playerUiService.currentPlaylist();

      load();
      function load() {
        return playlistService.query(scope.filters)
          .then(data => {
            scope.results = data;
            if (!data || data.length <= 0) {
              // just auto load for now
              sampleDataService.loadData();
              // sampleDataService.prompt();
            }
          });
      }

    }
  };
}
export { PlaylistMenu as default }

