import template from './sidenav.jade';

function SideNav($document) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {},
    link: (scope, el, attrs) => {
      scope.createMedia = () => {
        scope.$root.$broadcast('media.open', {});
      }
    }
  }
}
export { SideNav as default }

