import template from './nav-toolbar.jade';

function NavToolbar($document) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      // do nothing

    }
  }
}
export { NavToolbar as default }

