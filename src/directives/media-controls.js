import template from './media-controls.jade';

function MediaControls(playerUiService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      // trying exposing the whole service to the scope
      scope.player = playerUiService;


      scope.isPlaying       = () => playerUiService.isPlaying();
      scope.currentMedia    = () => playerUiService.currentMedia();
      scope.currentPlaylist = () => playerUiService.currentPlaylist();
      scope.currentProgress = () => playerUiService.getPlayPercent();
      scope.playPause       = () => {
        let current = playerUiService.currentMedia();
        console.log('Play Btn Clicked ', current, 'isPlaying:', scope.isPlaying());
        if (current) {
          playerUiService.playPause();
        }
      }
      scope.prev            = () => playerUiService.prev();
      scope.next            = () => playerUiService.next();

      scope.playlistPosition = () => {
        var playlist          = playerUiService.currentPlaylist();
        var media             = playerUiService.currentMedia();
        if (!playlist) { return {position: -1, nextEnabled: false, prevEnabled: false}; }
        if (!media)    { return {position: -1, nextEnabled: false, prevEnabled: false}; }
        var {tracks}          = playlist;
        var curIndex          = tracks && tracks.indexOf(media);
        return {
          position: curIndex,
          nextEnabled: curIndex < tracks.length - 1,
          prevEnabled: curIndex >= 1,
        };
      }

    }
  }
}
export { MediaControls as default }
