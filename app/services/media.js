import config from '../../config';

/*@ngInject*/
function MediaService($resource) {
  var Media = $resource(config.apiServerUrl+'media/:id', {id:'@id'}, { create: { method: 'PUT' } });
  return {
    get: (id = '') => { return Media.get({id}).$promise },
    remove: (id = '') => { return Media.remove({id}).$promise },
    query: ({title, album, artist, mediaUrl, sourceUrl, imageUrl}) => {
      return Media.query({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
    },
    create: ({title, album, artist, mediaUrl, sourceUrl, imageUrl}) => {
      return Media.create({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
    },
    save: ({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}) => {
      return Media.save({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
    },
  }

  // constructor($http) {
  //   this.$http = $http;
  //   this.baseUrl = this.config.apiServerUrl+'media/';
  // }
  // get(id = '') {    return $http({method: 'GET', {id}).$promise }
  // remove(id = '') { return $http.remove({id}).$promise }
  // query({title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
  //   return $http.query({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  // }
  // create({title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
  //   return $http.create({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  // }
  // save({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
  //   return $http.save({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  // }

}

export { MediaService as default }
