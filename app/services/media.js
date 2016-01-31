import config from '../../config';

class MediaService {

  /*@ngInject*/
  constructor($resource) {
    this.$resource = $resource;
    this.Media = $resource(this.config.apiServerUrl+'media/:id', {id:'@id'}, { create: { method: 'PUT' } });
  }
  get(id = '') {    return this.Media.$get({id}).$promise }
  remove(id = '') { return this.Media.$remove({id}).$promise }
  query({title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
    return this.Media.$query({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  }
  create({title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
    return this.Media.$create({title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  }
  save({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}) {
    return this.Media.$save({id, title, album, artist, mediaUrl, sourceUrl, imageUrl}).$promise
  }

}

export { MediaService as default }
