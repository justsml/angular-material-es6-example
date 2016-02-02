import config from '../../config';

function PlaylistService($resource, $http, $mdToast, playerUiService) {
  var Playlist = $resource(config.apiServerUrl+'playlist/:id', {id:'@id'}, { create: { method: 'PUT' } });
  return {
    addTrack: ({media}) => {
      var playlist = playerUiService.currentPlaylist();
      if (!playlist || !playlist.id) { return $mdToast.showSimple('No playlist selected') }
      if (!media    || !media.id) {    return $mdToast.showSimple('No Media - Cannot add nothing to playlist') }
      return $http({method: 'GET', url: `${config.apiServerUrl}playlist/${playlist.id}/tracks/add/${media.id}`})
        .error($mdToast.showSimple)
        .success(playerUiService.currentPlaylist)
    },
    removeTrack: ({media}) => {
      var playlist = playerUiService.currentPlaylist();
      if (!playlist || !playlist.id) { return $mdToast.showSimple('No playlist selected') }
      if (!media    || !media.id) {    return $mdToast.showSimple('No Media - Cannot remove from playlist') }
      return $http({method: 'GET', url: `${config.apiServerUrl}playlist/${playlist.id}/tracks/remove/${media.id}`})
        .error($mdToast.showSimple)
        .success(playerUiService.currentPlaylist)
    },

    get: (id = '') => {              return Playlist.get({id}).$promise },
    remove: (id = '') => {           return Playlist.remove({id}).$promise },
    query: ({title}) => {            return Playlist.query({title}).$promise },
    create: ({title, tracks}) => {   return Playlist.create({title, tracks}).$promise },
    save: ({id, title, tracks}) => { return Playlist.save({id, title, tracks}).$promise },
  }
}

export { PlaylistService as default }
