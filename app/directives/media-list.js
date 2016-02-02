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
      scope.$root.$on('media.refresh', load);
      scope.$root.$on('playlist.select', (event, playlist) => {
        scope.playlist = playerUiService.currentPlaylist()
      });
      scope.filters = scope.filters || {};
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

