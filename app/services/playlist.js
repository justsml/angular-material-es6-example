import config from '../../config';

/*@ngInject*/
function PlaylistService($resource) {
  var Playlist = $resource(config.apiServerUrl+'playlist/:id', {id:'@id'}, { create: { method: 'PUT' } });
  return {
    get: (id = '') => { return Playlist.get({id}).$promise },
    remove: (id = '') => { return Playlist.remove({id}).$promise },
    query: ({title}) => {
      return Playlist.query({title}).$promise
    },
    create: ({title, tracks}) => {
      return Playlist.create({title, tracks}).$promise
    },
    save: ({id, title, tracks}) => {
      return Playlist.save({id, title, tracks}).$promise
    },
  }
}

export { PlaylistService as default }
