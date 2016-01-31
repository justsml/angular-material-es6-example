import template from './sidenav.jade';

function SideNav($document) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      // do nothing

    }
  }
}
export { SideNav as default }

