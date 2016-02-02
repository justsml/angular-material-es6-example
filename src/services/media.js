import config from '../../config';

/*@ngInject*/
function MediaService($resource) {
  var Media = $resource(config.apiServerUrl+'media/:id', {id:'@id'}, { create: { method: 'PUT' } });
  return {
    get: (id = '') => Media.get({id}).$promise,
    remove: (id = '') => Media.remove({id}).$promise,
    query: ({title, album, artist, audioUrl, sourceUrl, imageUrl}) => {
      return Media.query({title, album, artist, audioUrl, sourceUrl, imageUrl}).$promise
    },
    create: ({title, album, artist, audioUrl, sourceUrl, imageUrl}) => {
      return Media.create({title, album, artist, audioUrl, sourceUrl, imageUrl}).$promise
    },
    save: ({id, title, album, artist, audioUrl, sourceUrl, imageUrl}) => {
      return Media.save({id, title, album, artist, audioUrl, sourceUrl, imageUrl}).$promise
    },
  }
}

export { MediaService as default }
