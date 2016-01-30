import template from './media-list.jade';

export class MediaList {
  constructor($document) {
    this.template = template;
    this.restrict = 'E';
    this.scope = {}
    this.$document = $document;
  }

  move () {
    console.log(this.name + ' is spinning wheels...')
  }
}
