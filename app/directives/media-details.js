import template from './media-details.jade';

export class MediaDetails {
  /*@ngInject*/
  constructor($document, mediaService) {
    this.template = template;
    this.restrict = 'E';
    this.scope = { media: '=?' }
    this.mediaService = mediaService;
    this.$document = $document;
  }

  link(scope, el, attrs) {
    // scope.get    = this.mediaService.get
    // scope.query  = this.mediaService.query
    scope.create = this.mediaService.create
    scope.save   = this.mediaService.save
    scope.remove = this.mediaService.remove
  }
}

export { MediaDetails as default }
