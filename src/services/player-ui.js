import config           from '../../config';
import Audio5js         from 'audio5';
import playlistTemplate from '../templates/dialog-playlist.jade';
import mediaTemplate    from '../templates/dialog-media.jade';
import formatTime       from '../modules/format-time';

function PlayerUiService($rootScope, $mdToast, $mdDialog) {
  var current = { playlist: null, media: null };
  var dialogPromise;
  var playerCtx = null,
      audioReady = false,
      playDuration = '',
      playTime = '',
      playPercent = 0;
  var playMedia = function(media) {
    if ( playerCtx ) {
      if ( playerCtx.playing ) { playerCtx.pause(); }
      playerCtx.destroy();
    }
    playerCtx = new Audio5js({
      swf_path:'/assets/audio5js.swf',
      codecs:         ['mp3'],
      throw_errors:   true,
      format_time:    false,
      ready: function() {
        console.log('Audio.ready (init)', media);
        playerCtx = this;
        this.load(media.audioUrl);
        this.play();
        this.one('canplay', () => {
          console.log('Audio.canplay', this);
          playerCtx = this;
          audioReady = true;
        });
        this.on('timeupdate', (percent) => {
          playPercent  = (this.position / this.duration) * 100;
          playTime            = formatTime(this.position);
          playDuration        = formatTime(this.duration);
        }, this);
        this.on('ended', () => {
          console.log('Audio.ended', this);
          svc.next();
        }, this);

        this.on('play', () => { console.log('Audio.play', this) }, this);
        this.on('pause', () => { console.log('Audio.pause', this) }, this);
        this.on('loadedmetadata', () => { console.log('Audio.loadedmetadata', arguments, this) }, this);

        this.on('error', (err) => {
          $mdToast.showSimple('Error Loading Media');
          console.error('Audio5 Error', err);
        }, this);
      }
    });
  }

  var svc = {
    context:        () => playerCtx,
    canPlay:        () => audioReady,
    getPlayPercent: () => playPercent,
    getPlayTime:    () => playTime,
    getDuration:    () => playDuration,
    isPlaying:      () => playerCtx && playerCtx.playing,
    play:           (media) => {
      console.log('playing...', arguments, playerCtx);
      playMedia(media);
    },
    pause:          () => playerCtx.pause.call(playerCtx),
    playPause: (media) => {
      console.log('svc.playPause', arguments);
      if (!audioReady) { return false; }
      if (media && media.audioUrl) {
        playerCtx.load.call(playerCtx, media.audioUrl);
        playerCtx.play.call(playerCtx);
      } else if (playerCtx.playing) {
        playerCtx.playPause.call(playerCtx);
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
      if ( playerCtx.playing ) {
        playerCtx.stop();
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
        svc.play(media);
      }
      return current.media;
    }
  };
  return svc;
}

export { PlayerUiService as default }
