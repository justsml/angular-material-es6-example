import template from './media-list.jade';

function MediaList($timeout, mediaService, playlistService, playerUiService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {
      filters: '=?',
      title:   '=?',
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};
      scope.currentPlaylist = playerUiService.currentPlaylist;
      scope.currentMedia    = playerUiService.currentMedia;
      scope.$root.$on('media.refresh', load);
      scope.$root.$on('playlist.select', (event, playlist) => {
        scope.playlist = playlist || playerUiService.currentPlaylist();
        if (scope.playlist && scope.playlist.tracks) {
          scope.allPlaylistTracks = scope.playlist.tracks;
        }
      });
      scope.createMedia = (track, playlist) => {
        playerUiService.mediaDialog({parent: playlist});
      }
      scope.currentTitle = () => {
        let playlist = playerUiService.currentPlaylist();
        let titleTag = playlist && playlist.title ? playlist.title : 'All';
        return `Media List (${titleTag})`;
      }
      scope.addRemoveTrack = (track, playlist) => {
        if (!scope.inPlaylist(track, playlist)) {
          playlistService.addTrack({media: track, playlist})
            .success(data => {
              scope.playlist = data;
              scope.allPlaylistTracks = scope.playlist.tracks;
            })
        } else {
          playlistService.removeTrack({media: track, playlist})
            .success(data => {
              scope.playlist = data;
              scope.allPlaylistTracks = scope.playlist.tracks;
            })
        }
        $timeout(() => {
          scope.$root.$broadcast('media.refresh');
          scope.$root.$broadcast('playlist.refresh');
        }, 500);
      }
      scope.inPlaylist = (track, playlist) => {
        if (!playlist) { return false; }
        let {tracks} = playlist;
        let matched = tracks.filter(t => t.id === track.id);
        return matched && matched.length >= 1 ? true : false;
      }
      scope.allTracksRemaining = () => {
        let remaining = scope.allTracks.filter(item => !scope.inPlaylist(item, scope.playlist))
        return remaining.length;
      }

      load();
      function load() {
        return mediaService.query(scope.filters)
          .then(data => scope.allTracks = data)
      }
    }
  }
}
export { MediaList as default }

