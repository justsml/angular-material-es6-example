import template from './media-list.jade';

class MediaList {
  /*@ngInject*/
  constructor($document, mediaService) {
    this.template = template;
    this.restrict = 'E';
    this.scope = {}
    this.mediaService = mediaService;
    this.$document = $document;
    this.load();
  }

  link(scope, el, attrs) {
    this.mediaService.query(scope.filters)
    .$then(data => scope.results = data)
  }

}

export { MediaList as default }

