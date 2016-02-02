import config from '../../config';

function PlaylistService($resource, $http, $mdToast, playerUiService) {
  var Playlist = $resource(config.apiServerUrl+'playlist/:id', {id:'@id'}, { create: { method: 'POST' } });
  return {
    addTrack: ({media, playlist}) => {
      playlist = playlist || playerUiService.currentPlaylist();
      if (!playlist || !playlist.id) { return $mdToast.showSimple('No playlist selected') }
      if (!media    || !media.id) {    return $mdToast.showSimple('No Media - Cannot add nothing to playlist') }
      return $http({method: 'GET', url: `${config.apiServerUrl}playlist/${playlist.id}/tracks/add/${media.id}`})
        .error($mdToast.showSimple)
        .success(data => {
          return $mdToast.show($mdToast.simple().textContent(`Added ${media.title} to ${playlist.title}`).position('right top').hideDelay(5000));
        })
    },
    removeTrack: ({media, playlist}) => {
      playlist = playlist || playerUiService.currentPlaylist();
      if (!playlist || !playlist.id) { return $mdToast.showSimple('No playlist selected') }
      if (!media    || !media.id) {    return $mdToast.showSimple('No Media - Cannot remove from playlist') }
      return $http({method: 'GET', url: `${config.apiServerUrl}playlist/${playlist.id}/tracks/remove/${media.id}`})
        .error($mdToast.showSimple)
        .success(data => {
          return $mdToast.show($mdToast.simple().textContent(`Removed ${media.title} from ${playlist.title}`).position('right top').hideDelay(3000));
        })
    },
    get: (id = '') => {              return Playlist.get({id}).$promise },
    remove: (id = '') => {           return Playlist.remove({id}).$promise },
    query: ({title}) => {            return Playlist.query({title}).$promise },
    create: ({title, tracks}) => {   return Playlist.create({title, tracks}).$promise },
    save: ({id, title, tracks}) => { return Playlist.save({id, title, tracks}).$promise },
  }
}

export { PlaylistService as default }
