import config           from '../../config';
import Audio5js         from 'audio5';
import playlistTemplate from './dialog-playlist.jade';
import mediaTemplate    from './dialog-media.jade';
/*@ngInject*/
function PlayerUiService($rootScope, $mdToast, $mdDialog) {
  // Tracks currently playing media (hidden var)
  var current = { playlist: null, media: null };
  var dialogPromise;
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
    playlistDialog: (playlist = null) => {
      dialogPromise = $mdDialog.show({
        template:             playlistTemplate(),
        locals:               { 'playlist': playlist },
        clickOutsideToClose:  true,
        scope:                $rootScope.$new(), // use parent scope in template
        preserveScope:        false,  // do not forget this if use parent scope
        // Since the Controller is instantiated with ControllerAs syntax
        // AND we are passing the parent '$scope' to the dialog, we MUST
        // use 'ctrl.<xxx>' in the template markup
        controllerAs: 'ctrl',
        controller: function DialogController($scope, $mdDialog, playlistService) {
          var save = function _save(playlist) {
            if (!playlist.title || playlist.title.length < 1 ) {
              return $mdToast.showSimple('Playlist Title required');
            }
            return playlistService.save(playlist)
            .then(data => {
              $mdDialog.hide();
              $rootScope.$broadcast('playlist.refresh');
            });
          };

          $scope.save = save;
          $scope.close  = $mdDialog.hide;
        }
      })
      return dialogPromise;
    },
    mediaDialog: (media = null) => {

      dialogPromise = $mdDialog.show({
        template:             mediaTemplate(),
        locals:               { 'save': save, 'media': media },
        clickOutsideToClose:  true,
        scope:                $rootScope.$new(), // use parent scope in template
        preserveScope:        false,  // do not forget this if use parent scope
        // Since the Controller is instantiated with ControllerAs syntax
        // AND we are passing the parent '$scope' to the dialog, we MUST
        // use 'ctrl.<xxx>' in the template markup
        controllerAs: 'ctrl',
        controller: function DialogController($scope, $mdDialog, mediaService) {
          var save = function _save(media) {
            if (!media.title || media.title.length < 1 ) { return $mdToast.showSimple('Media Title required'); }
            if (!media.audioUrl || media.audioUrl.length < 1 || /\.mp3$/i.test(media.audioUrl) ) { return $mdToast.showSimple('Audio URL required'); }
            return mediaService.save(media)
            .then(data => {
              $mdDialog.hide();
              $rootScope.$broadcast('media.refresh');
            });
          };
          $scope.save = save;
          $scope.close  = $mdDialog.hide;
        }
      });
      return dialogPromise;
    },
    resetPlaylist: () => {
      if ( audio5.playing ) {
        audio5.stop();
      }
      current.playlist = null;
      current.media    = null;
    },
    // This next 2 methods are global helpers which work like dual getter+setter (jquery style)
    currentPlaylist: (playlist) => {
      if (playlist) {
        current.playlist = playlist;
        $rootScope.$broadcast('playlist.select', playlist);
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
        $rootScope.$broadcast('media.select', media);
        $mdToast.show($mdToast.simple().textContent(`Playing ${media.title}...`));
        svc.playPause(media);
      }
      return current.media;
    }
  };
  return svc;
}

export { PlayerUiService as default }
