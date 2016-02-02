import {Playlists, Tracks} from '../../config/dummy-data';
import Promise from 'bluebird';

function SampleData(mediaService, playlistService, $mdToast, $rootScope) {
  var toast = null;

  function prompt() {
    toast = $mdToast.simple()
      .textContent('Empty DB, Load Sample Data?')
      .action('IMPORT')
      .highlightAction(true)
      .position('right top')
      .hideDelay(12000);
    $mdToast.show(toast)
    .then(function(response) {
      if ( response == 'ok' ) {
        loadData();
      }
    });
  }
  function loadData() {
    let trackPromise = Promise.resolve(Tracks).map(track =>           mediaService.create(track))
    let playlistPromise = Promise.resolve(Playlists).map(playlist =>  playlistService.create(playlist))
    Promise.join(trackPromise, playlistPromise,
    function _handleResults(trackResult, playlistResult) {
      console.log('Data Load Results', arguments);
      $mdToast.showSimple('*** Note: Sample Data Loaded! ***');
      $rootScope.$broadcast('media.refresh');
      $rootScope.$broadcast('playlist.refresh');
    });
  }

  return {
    prompt: prompt,
    loadData: loadData,
  }
}

export { SampleData as default }
