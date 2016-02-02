import template from './sidenav.jade';

function SideNav(playerUiService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      scope.createPlaylist = playerUiService.playlistDialog
      scope.selectPlaylist = playerUiService.currentPlaylist
    }
  }
}
export { SideNav as default }

