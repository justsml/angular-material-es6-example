import template from './playlist-menu.jade';
import dialogTemplate from './playlist-menu-dialog.jade';
    // var originatorEv;
    // this.openMenu = function($mdOpenMenu, ev) {
    //   originatorEv = ev;
    //   $mdOpenMenu(ev);
    // };

function PlaylistMenu(playlistService, $mdDialog) {
  return {
    template:   template,
    restrict:   'E',
    scope: {
     filters: '=?',
    },
    link: (scope, el, attrs) => {
      scope.filters = scope.filters || {};

      scope.create = create;
      load();

      function load() {
        return playlistService.query(scope.filters).then(data => scope.results = data);
      }
      function create() {
        var save = function _save(playlist) {
          if (!playlist.title || playlist.title.length < 1 ) {
            return alert('uh oh');
          }
          return playlistService.save(playlist)
            .then($mdDialog.hide)
            .then(load);
        };
        return $mdDialog.show({
          template:             dialogTemplate(),
          locals:               { 'save': save },
          clickOutsideToClose:  true,
          scope:                scope, // use parent scope in template
          preserveScope:        true,  // do not forget this if use parent scope
          // Since the Controller is instantiated with ControllerAs syntax
          // AND we are passing the parent '$scope' to the dialog, we MUST
          // use 'ctrl.<xxx>' in the template markup
          controllerAs: 'ctrl',
          controller: function DialogController($scope, $mdDialog) {
            $scope.save = save;
            $scope.close  = $mdDialog.hide;
          }
        })
      }
    }
  };
}
export { PlaylistMenu as default }

