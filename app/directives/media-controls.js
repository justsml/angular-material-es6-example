import template from './media-controls.jade';
import _        from 'lodash';


function MediaControls(playerUiService) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      scope.currentProgress = () => playerUiService.getPlayPercent();
      scope.playPause       = () => playerUiService.playPause();

    }
  }
}
export { MediaControls as default }
