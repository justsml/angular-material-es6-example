import config           from '../../config';
import Audio5js         from 'audio5';
import playlistTemplate from '../templates/dialog-playlist.jade';
import mediaTemplate    from '../templates/dialog-media.jade';

function PlayerUiService($rootScope, $mdToast, $mdDialog) {
  var current = { playlist: null, media: null };
  var dialogPromise;
  var audioReady = false, currentPlayPercent = 0;
  var audio5 = new Audio5js({
    swf_path:'/assets/audio5js.swf',
    codecs:         ['mp3'],
    throw_errors:   true,
    format_time:    true,
    ready: function() {
      audioReady = true;
      this.on('timeupdate', (percent) => {
        currentPlayPercent = percent;
      }, this)
    }
  });

  var svc = {
    audio5, // expose instance for debugging
    getPlayPercent: () => currentPlayPercent,
    getPlayTime:    () => audio5.position,
    isPlaying:      () => audio5.playing,
    play:           () => audio5.play(),
    pause:          () => audio5.pause(),
    playPause: (media) => {
      if (!audioReady) { return false; }
      if (media && media.audioUrl) {
        audio5.load.call(audio5, media.audioUrl);
        audio5.play.call(audio5);
      } else if (audio5.playing) {
        audio5.playPause.call(audio5);
      } else {
        // do nothing
      }
      return media;
    },
    next: () => {
      var {playlist, media} = current;
      if ( !playlist ) { return $mdToast.showSimple('Error: No Playlist Selected') }
      var {tracks}          = playlist;
      if ( !tracks || tracks.length === 0 ) { return $mdToast.showSimple('Error: Playlist Has no Tracks') }
      var curIndex          = tracks.indexOf(media);
      if ( !tracks[curIndex+1] ) {
        curIndex = 0;
      } else {
        curIndex ++;
      }
      return svc.currentMedia(tracks[curIndex]);
    },
    prev: () => {
      var {playlist, media} = current;
      if ( !playlist ) { return $mdToast.showSimple('Error: No Playlist Selected') }
      var {tracks}          = playlist;
      if ( !tracks || tracks.length === 0 ) { return $mdToast.showSimple('Error: Playlist Has no Tracks') }
      var curIndex          = tracks.indexOf(media);
      if ( curIndex >= 1 && !tracks[curIndex-1] ) {
        curIndex = 0; //fall to beginning
      } else {
        curIndex --;
      }
      return svc.currentMedia(tracks[curIndex]);
    },
    playlistDialog: (playlist = null) => {
      dialogPromise = $mdDialog.show({
        template:             playlistTemplate(),
        locals:               { 'playlist': playlist },
        clickOutsideToClose:  true,
        scope:                $rootScope.$new(), // use parent scope in template
        preserveScope:        false,  // do not forget this if use parent scope
        controllerAs: 'ctrl',
        /*@ngInject*/
        controller: function DialogController($scope, $mdDialog, playlistService) {
          var save = function _save(playlist) {
            if (!playlist) { return $mdDialog.hide(dialogPromise); }
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
        locals:               { 'media': media },
        clickOutsideToClose:  true,
        scope:                $rootScope.$new(), // use parent scope in template
        preserveScope:        false,  // do not forget this if use parent scope
        controllerAs: 'ctrl',
        /*@ngInject*/
        controller: function DialogController($scope, $mdDialog, mediaService) {
          var save = function _save(media) {
            if (!media) { return $mdDialog.hide(dialogPromise); }
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
        $mdToast.show($mdToast.simple().textContent(`Playing ${media.title}...`).position('right bottom').hideDelay(2500));
        svc.playPause(media);
      }
      return current.media;
    }
  };
  return svc;
}

export { PlayerUiService as default }
