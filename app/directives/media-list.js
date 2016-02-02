import template from './media-list.jade';

function MediaList($document, mediaService, playerUiService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {
      filters: '=?',
      title:   '=?',
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      load();
      scope.$root.$on('media.refresh', load);
      scope.$root.$on('playlist.select', (event) => {
        var playlist = scope.playlist = playerUiService.currentPlaylist();
        if (playlist && playlist.tracks) {
          scope.results = playlist.tracks;
        }
      });
      scope.currentPlaylist = playerUiService.currentPlaylist;
      scope.currentTitle = () => {
        let playlist = playerUiService.currentPlaylist();
        let titleTag = playlist && playlist.title ? playlist.title : 'All';
        return `Media List (${titleTag})`;
      }
      function load() {
        return mediaService.query(scope.filters)
          .then(data => scope.results = data)
      }
    }
  }
}
export { MediaList as default }

