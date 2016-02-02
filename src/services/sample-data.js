import {Playlists, Tracks} from '../../config/dummy-data';
import Promise from 'bluebird';

function SampleData(mediaService, playlistService, $mdToast, $rootScope) {
  return {
    load: () => {
      let trackPromise = Promise.resolve(Tracks).map(track => mediaService.create(track))
      let playlistPromise = Promise.resolve(Playlists).map(playlist => playlistService.create(playlist))
      Promise.join(trackPromise, playlistPromise,
      function _handleResults(trackResult, playlistResult) {
        console.log('Data Load Results', arguments);
        $mdToast.showSimple('Loaded Sample Data!');
        $rootScope.$broadcast('media.refresh');
        $rootScope.$broadcast('playlist.refresh');
      });
    }
  }
}

export { SampleData as default }
