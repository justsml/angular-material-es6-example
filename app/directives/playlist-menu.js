import template from './playlist-menu.jade';
    // var originatorEv;
    // this.openMenu = function($mdOpenMenu, ev) {
    //   originatorEv = ev;
    //   $mdOpenMenu(ev);
    // };

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
      load();

      function load() {
        return playlistService.query(scope.filters).then(data => scope.results = data);
      }

    }
  };
}
export { PlaylistMenu as default }

