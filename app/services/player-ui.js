import config from '../../config';
import Audio5js from 'audio5';

/*@ngInject*/
function PlayerUiService($rootScope, $mdToast) {
  // Tracks currently playing media (hidden var)
  var current = { playlist: null, media: null };
  var audio5 = new Audio5js({
    // swf_path:'/assets/swf/audio5js.swf',
    codecs:         ['mp3'],
    throw_errors:   true,
    format_time:    true,
  });

  var svc = {
    audio5, // expose instance for debugging
    getPlayPercent: () => audio5.load_percent,
    getPlayTime:    () => audio5.position,
    isPlaying:      () => audio5.playing,
    playPause: (media) => {
      if (media && media.audioUrl) {
        audio5.load(media.audioUrl);
      } else {
        audio5.playPause();
      }
    },
    next: () => {
      var {playlist, media} = current;
      if ( !playlist ) { return $mdToast.showSimple('Error: No Playlist Selected') }
      var {tracks}          = playlist;
      var curIndex          = tracks.indexOf(media) + 1;
      if (curIndex >= tracks.length-1) { curIndex = 0;}
      if ( !tracks || tracks.length === 0 ) { return $mdToast.showSimple('Error: Playlist Has no Tracks') }
      return svc.currentMedia(tracks[curIndex]);
    },

    // This next 2 methods are global helpers which work like dual getter+setter (jquery style)
    currentPlaylist: (playlist) => {
      if (playlist) {
        current.playlist = playlist;
        if (playlist.tracks && playlist.tracks.length > 0) {
          svc.currentMedia(playlist.tracks[0]);
        }
      }
      return current.playlist;
    },
    currentMedia: (media) => {
      if (media) {
        current.media = media;
        $mdToast.show($mdToast.simple().textContent(`Playing ${media.title}...`));
        svc.playPause(media);
      }
      return current.media;
    }
  };
  return svc;
}

export { PlayerUiService as default }
