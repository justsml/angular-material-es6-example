import config from '../../config';

/*@ngInject*/
function PlayerService($rootScope) {
  // Tracks currently playing media
  $rootScope.current = { playlist: null, media: null };
  // This service exposes 2 global helpers which work like dual getter+setter (jquery style)

  return {
    currentPlaylist: (playlist) => {
      if (playlist) {$rootScope.current.playlist = playlist;}
      return $rootScope.current.playlist;
    },
    currentMedia: (media) => {
      if (media) {$rootScope.current.media = media;}
      return $rootScope.current.media;
    },
  }
}

export { PlayerService as default }
