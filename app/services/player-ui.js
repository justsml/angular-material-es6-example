import config           from '../../config';
import Audio5js         from 'audio5';
import dialogTemplate   from './playlist-menu-dialog.jade';

/*@ngInject*/
function PlayerUiService($rootScope, $mdToast, $mdDialog, playlistService) {
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
    playlistDialog: (playlist = null) {
      var save = function _save(playlist) {
        if (!playlist.title || playlist.title.length < 1 ) {
          return alert('uh oh');
        }
        return playlistService.save(playlist)
          .then($mdDialog.hide)
          .then(load);
      };
      return $mdDialog.show({
        template:             dialogTemplate(),
        locals:               { 'save': save },
        clickOutsideToClose:  true,
        scope:                scope, // use parent scope in template
        preserveScope:        true,  // do not forget this if use parent scope
        // Since the Controller is instantiated with ControllerAs syntax
        // AND we are passing the parent '$scope' to the dialog, we MUST
        // use 'ctrl.<xxx>' in the template markup
        controllerAs: 'ctrl',
        controller: function DialogController($scope, $mdDialog) {
          $scope.save = save;
          $scope.close  = $mdDialog.hide;
        }
      })
    },

    // This next 2 methods are global helpers which work like dual getter+setter (jquery style)
    currentPlaylist: (playlist) => {
      if (playlist) {
        current.playlist = playlist;
        if (playlist.tracks && playlist.tracks.length > 0) {
          svc.currentMedia(playlist.tracks[0]);
        } else {
          current.media = null;
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
